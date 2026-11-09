"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { APPLICATION_STATUSES, ApplicationStatus, JobInput } from "../types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ChipGroup } from "@/components/ChipGroup";
import { useActionState, useState } from "react";
import { createJob } from "../actions";
import { StatusInfo } from "./StatusBadge";
import Link from "next/link";

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
    <form className="grid max-w-xl gap-4" noValidate action={formAction}>
      <Field data-invalid={!!fieldErrors.company}>
        <FieldLabel htmlFor="company">Company</FieldLabel>
        <Input
          id="company"
          name="company"
          required
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
          required
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
        <input type="hidden" name="status" value={status} />
        <ChipGroup
          options={APPLICATION_STATUSES}
          value={status}
          ariaLabel="Status"
          onChange={(e) => setStatus(e)}
          getLabel={(option) => {
            return StatusInfo[option].label;
          }}
          chipStyleClass={(option) => {
            if (status === option) {
              return (
                StatusInfo[option].className +
                ` ring-2 ring-status-${option}/20`
              );
            }
            return StatusInfo[option].className;
          }}
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
        <Link href="/jobs" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
};
