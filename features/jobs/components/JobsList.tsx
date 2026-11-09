import { ToastMessage } from "@/components/ToastMessage";
import { getJobs } from "../data";
import { JobCard } from "./JobCard";
import { EmptyState } from "@/components/EmptyState";
import { Briefcase } from "lucide-react";

type JobsListProps = {
  id?: string;
};

export const JobsList = async ({ id }: JobsListProps) => {
  const jobs = await getJobs();

  return (
    <>
      {id && (
        <ToastMessage
          type="success"
          message={`Job ${id} Created Successfully`}
        ></ToastMessage>
      )}
      {jobs.length === 0 && (
        <EmptyState
          title="No applications yet"
          icon={<Briefcase />}
        ></EmptyState>
      )}
      {jobs.length > 0 && (
        <ul className="grid list-none gap-3">
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
