"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { APPLICATION_STATUSES, ApplicationStatus, JobInput } from "../types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ChipGroup } from "@/components/ChipGroup";
import { useActionState, useState } from "react";
import { createJob } from "../actions";

type CreateJobFormProps = {
  initialValues: JobInput;
};

export const CreateJobForm = ({ initialValues }: CreateJobFormProps) => {
  const [status, setStatus] = useState<ApplicationStatus>(initialValues.status);
  const [state, formAction, pending] = useActionState(createJob, {
    error: null,
  });
  const fieldErrors =
    state.error?.type === "validation" ? state.error.fields : {};
  return (
    <form className="grid gap-4" noValidate action={formAction}>
      <Field data-invalid={!!fieldErrors.company}>
        <FieldLabel htmlFor="company">Company</FieldLabel>
        <Input
          id="company"
          name="company"
          type="text"
          placeholder="Company"
          aria-invalid={!!fieldErrors.company}
          defaultValue={
            state.error && state.error.type === "validation"
              ? state.error.values.company
              : initialValues.company
          }
        />
        {fieldErrors.company && (
          <FieldError errors={[{ message: fieldErrors.company }]} />
        )}
      </Field>
      <Field data-invalid={!!fieldErrors.role}>
        <FieldLabel htmlFor="role">Role</FieldLabel>
        <Input
          id="role"
          name="role"
          type="text"
          placeholder="Role"
          aria-invalid={!!fieldErrors.role}
          defaultValue={
            state.error && state.error.type === "validation"
              ? state.error.values.role
              : initialValues.role
          }
        />
        {fieldErrors.role && (
          <FieldError errors={[{ message: fieldErrors.role }]} />
        )}
      </Field>

      <Field data-invalid={!!fieldErrors.status}>
        <FieldLabel>Status</FieldLabel>
        <input
          type="hidden"
          name="status"
          value={
            state.error && state.error.type === "validation"
              ? state.error.values.status
              : status
          }
        />
        <ChipGroup
          options={APPLICATION_STATUSES}
          value={
            state.error && state.error.type === "validation"
              ? state.error.values.status
              : status
          }
          ariaLabel="Status"
          onChange={(e) => setStatus(e)}
        ></ChipGroup>
        {fieldErrors.status && (
          <FieldError errors={[{ message: fieldErrors.status }]} />
        )}
      </Field>

      <Field data-invalid={!!fieldErrors.notes}>
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Notes"
          aria-invalid={!!fieldErrors.notes}
          defaultValue={
            (state.error && state.error.type === "validation"
              ? state.error.values.notes
              : initialValues.notes) ?? ""
          }
        ></Textarea>
        {fieldErrors.notes && (
          <FieldError errors={[{ message: fieldErrors.notes }]} />
        )}
      </Field>

      {!!state.error && state.error.type === "server" && (
        <p role="alert" className="text-sm text-destructive">
          {state.error.message}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
};
