import { getJobs } from "../data";
import { JobCard } from "./JobCard";

type JobsListProps = {
  id?: string;
};

export const JobsList = async ({ id }: JobsListProps) => {
  const jobs = await getJobs(id);

  return (
    <>
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
    </>
  );
};
