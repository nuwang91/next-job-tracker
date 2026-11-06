"use server";

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreatedJob } from "./types";

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
}

export async function createJob(formData: FormData) {
  const company = formData.get("company");
  const role = formData.get("role");
  const status = formData.get("status");
  const notes = formData.get("notes");

  const { rows } = await pool.query<CreatedJob>(
    "insert into jobs(company, role, status, notes) values($1, $2, $3, $4) returning id",
    [company, role, status, notes],
  );

  return rows[0];
}
