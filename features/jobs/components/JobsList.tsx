import { getJobs } from "../data";
import { JobCard } from "./JobCard";
import { ToastMessage } from "@/components/ToastMessage";

type JobsListProps = {
  id?: string;
};

export const JobsList = async ({ id }: JobsListProps) => {
  const jobs = await getJobs();

  return (
    <ul>
      {id && (
        <ToastMessage
          type="success"
          message={`Job ${id} Created Successfully`}
        ></ToastMessage>
      )}
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
  );
};
