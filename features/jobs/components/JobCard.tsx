import type { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { JobApplication } from "@/features/jobs/types";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@/lib/formatDate";
import { DeleteJobButton } from "./DeleteJobButton";
import { deleteJob } from "../actions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type JobCardProps = Omit<JobApplication, "notes"> & {
  footer?: ReactNode;
};

export const JobCard = ({
  id,
  company,
  role,
  status,
  interviews,
  createdAt,
  footer,
}: JobCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{role}</CardTitle>
        <CardDescription>{company}</CardDescription>
        <CardAction>
          <StatusBadge status={status} />
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Applied {formatDate(createdAt, "short")} · {interviews} interview(s)
      </CardContent>
      <CardFooter className="justify-end gap-2">
        {footer}
        <Link
          href={`/jobs/${id}`}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          View
        </Link>
        <form action={deleteJob}>
          <input type="hidden" name="id" value={id} />
          <DeleteJobButton company={company} role={role}></DeleteJobButton>
        </form>
      </CardFooter>
    </Card>
  );
};
