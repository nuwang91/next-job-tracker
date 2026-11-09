import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import type { JobApplication } from "@/features/jobs/types";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@/lib/formatDate";
import { DeleteJobButton } from "./DeleteJobButton";
import { deleteJob } from "../actions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type JobCardProps = Omit<JobApplication, "notes">;

export const JobCard = ({
  id,
  company,
  role,
  status,
  interviews,
  createdAt,
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
        <div className="flex justify-end">
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
        </div>
      </CardContent>
    </Card>
  );
};
