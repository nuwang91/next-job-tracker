"use server";

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreatedJob, isValidStatus, JobInput } from "./types";
import { redirect } from "next/navigation";

type JobFormState =
  | {
      error: { type: "server"; message: string };
    }
  | {
      error: {
        type: "validation";
        fields: Partial<Record<keyof JobInput, string>>;
        values: JobInput;
      };
    }
  | { error: null };

export async function deleteJob(formData: FormData) {
  const id = formData.get("id");

  if (id == null || id === "") {
    throw new Error("Invalid Job ID");
  }

  const jobId = Number(id);

  if (!Number.isInteger(jobId)) {
    throw new Error("Job ID must be an integer");
  }

  await pool.query("delete from jobs j WHERE j.id = $1;", [jobId]);

  revalidatePath("/jobs");
  revalidatePath("/");
}

export async function createJob(
  previousState: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  let job: CreatedJob;
  const company = formData.get("company");
  const role = formData.get("role");
  const status = formData.get("status");
  const notes = formData.get("notes") || null;

  const existingValues = {
    values: {
      company: String(company),
      role: String(role),
      notes: typeof notes === "string" ? notes : "",
      status: isValidStatus(status) ? status : "applied",
    },
  };

  if (!company || typeof company !== "string")
    return {
      error: {
        type: "validation",
        fields: { company: "Company is required" },
        ...existingValues,
      },
    };

  if (!role || typeof role !== "string")
    return {
      error: {
        type: "validation",
        fields: { role: "Role is required" },
        ...existingValues,
      },
    };

  if (!isValidStatus(status))
    return {
      error: {
        type: "validation",
        fields: { status: "Invalid Status" },
        ...existingValues,
      },
    };

  if (notes && typeof notes !== "string")
    return {
      error: {
        type: "validation",
        fields: { notes: "Invalid notes" },
        ...existingValues,
      },
    };

  try {
    const { rows } = await pool.query<CreatedJob>(
      "insert into jobs(company, role, status, notes) values($1, $2, $3, $4) returning id",
      [company, role, status, notes],
    );

    job = rows[0];
  } catch (e) {
    console.error("Failed to create job:", e);

    return {
      error: {
        message: "Unable to create job. Please try again.",
        type: "server",
      },
    };
  }

  if (job && job.id) {
    revalidatePath("/");
    redirect(`/jobs?created=${job.id}`);
  }

  return { error: null };
}
