import { JobCardSkeleton } from "@/features/jobs/components/JobCardSkeleton";
import { JobsList } from "@/features/jobs/components/JobsList";
import { Suspense } from "react";

type JobListingProps = {
  searchParams: Promise<{ created?: string }>;
};

const JobListing = async ({ searchParams }: JobListingProps) => {
  const { created } = await searchParams;

  return (
    <JobsList id={typeof created === "string" ? created : undefined}></JobsList>
  );
};

const JobsPage = ({ searchParams }: PageProps<"/jobs">) => {
  return (
    <main>
      <h1>Jobs</h1>
      <Suspense fallback={<JobCardSkeleton />}>
        <JobListing searchParams={searchParams}></JobListing>
      </Suspense>
    </main>
  );
};

export default JobsPage;
