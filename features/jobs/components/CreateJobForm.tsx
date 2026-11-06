"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  APPLICATION_STATUSES,
  ApplicationStatus,
  isValidStatus,
  JobInput,
} from "../types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ChipGroup } from "@/components/ChipGroup";
import { useActionState, useState } from "react";
import { createJob } from "../actions";
import { useRouter } from "next/navigation";

type JobFormState =
  | {
      error: { type: "server"; message: string };
    }
  | {
      error: {
        type: "validation";
        field: keyof JobInput;
        message: string;
      };
    }
  | { error: null };

type CreateJobFormProps = {
  initialValues: JobInput;
};

export const CreateJobForm = ({ initialValues }: CreateJobFormProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<ApplicationStatus>(initialValues.status);
  const [state, formAction, pending] = useActionState(
    async (
      _prevState: JobFormState,
      formData: FormData,
    ): Promise<JobFormState> => {
      const company = formData.get("company");
      const role = formData.get("role");
      const status = formData.get("status");
      const notes = formData.get("notes");

      if (!company || typeof company !== "string")
        return {
          error: {
            message: "Company is required",
            type: "validation",
            field: "company",
          },
        };

      if (!role || typeof role !== "string")
        return {
          error: {
            message: "Role is required",
            type: "validation",
            field: "role",
          },
        };

      if (!isValidStatus(status))
        return {
          error: {
            message: "Invalid Status",
            type: "validation",
            field: "status",
          },
        };

      if (notes && typeof notes !== "string")
        return {
          error: {
            message: "Invalid notes",
            type: "validation",
            field: "notes",
          },
        };

      try {
        const job = await createJob(formData);

        if (job && job.id) {
          router.push(`/jobs?created=${job.id}`);
        }

        return { error: null };
      } catch (e) {
        return {
          error: {
            message: e instanceof Error ? e.message : "Something went wrong!",
            type: "server",
          },
        };
      }
    },
    { error: null },
  );
  return (
    <form className="grid gap-4" noValidate action={formAction}>
      <Field
        data-invalid={
          !!state.error &&
          state.error.type === "validation" &&
          state.error.field === "company"
        }
      >
        <FieldLabel htmlFor="company">Company</FieldLabel>
        <Input
          id="company"
          name="company"
          type="text"
          placeholder="Company"
          aria-invalid={
            !!state.error &&
            state.error.type === "validation" &&
            state.error.field === "company"
          }
          defaultValue={initialValues.company}
        />
        {!!state.error &&
          state.error.type === "validation" &&
          state.error.field === "company" && (
            <FieldError errors={[{ message: state.error.message }]} />
          )}
      </Field>
      <Field
        data-invalid={
          !!state.error &&
          state.error.type === "validation" &&
          state.error.field === "role"
        }
      >
        <FieldLabel htmlFor="role">Role</FieldLabel>
        <Input
          id="role"
          name="role"
          type="text"
          placeholder="Role"
          aria-invalid={
            !!state.error &&
            state.error.type === "validation" &&
            state.error.field === "role"
          }
          defaultValue={initialValues.role}
        />
        {!!state.error &&
          state.error.type === "validation" &&
          state.error.field === "role" && (
            <FieldError errors={[{ message: state.error.message }]} />
          )}
      </Field>

      <Field
        data-invalid={
          !!state.error &&
          state.error.type === "validation" &&
          state.error.field === "status"
        }
      >
        <FieldLabel>Status</FieldLabel>
        <input type="hidden" name="status" value={status} />
        <ChipGroup
          options={APPLICATION_STATUSES}
          value={status}
          ariaLabel="Status"
          onChange={(e) => setStatus(e)}
        ></ChipGroup>
        {!!state.error &&
          state.error.type === "validation" &&
          state.error.field === "status" && (
            <FieldError errors={[{ message: state.error.message }]} />
          )}
      </Field>

      <Field
        data-invalid={
          !!state.error &&
          state.error.type === "validation" &&
          state.error.field === "notes"
        }
      >
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Notes"
          aria-invalid={
            !!state.error &&
            state.error.type === "validation" &&
            state.error.field === "notes"
          }
          defaultValue={initialValues.notes}
        ></Textarea>
        {!!state.error &&
          state.error.type === "validation" &&
          state.error.field === "notes" && (
            <FieldError errors={[{ message: state.error.message }]} />
          )}
      </Field>

      {!!state.error && state.error.type === "server" && (
        <p role="alert" className="text-sm text-destructive">
          {state.error.message}
        </p>
      )}

      <div className="flex justify-end gap-2">
        {/* <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button> */}
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
};
