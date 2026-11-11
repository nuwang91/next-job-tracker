import { getJobs } from "../data";
import { JobCard } from "./JobCard";
import { EmptyState } from "@/components/EmptyState";
import { Briefcase } from "lucide-react";
import { JobCreatedToast } from "./JobCreatedToast";

type JobsListProps = {
  id?: string;
  query: string;
};

export const JobsList = async ({ id, query }: JobsListProps) => {
  const jobs = await getJobs(query.trim());

  return (
    <>
      {id && <JobCreatedToast />}
      {jobs.length === 0 && (
        <EmptyState
          title="No applications yet"
          icon={<Briefcase />}
        ></EmptyState>
      )}
      {jobs.length > 0 && (
        <ul className="grid w-full list-none gap-3">
          {jobs.map((job) => {
            return (
              <li key={job.id}>
                <JobCard
                  id={job.id}
                  company={job.company}
                  createdAt={job.createdAt}
                  interviews={job.interviews}
                  role={job.role}
                  status={job.status}
                ></JobCard>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
