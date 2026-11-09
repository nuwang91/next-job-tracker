import { PageHeader } from "@/components/PageHeader";
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
      <PageHeader title="Jobs"></PageHeader>
      <Suspense fallback={<JobCardSkeleton />}>
        <JobListing searchParams={searchParams}></JobListing>
      </Suspense>
    </main>
  );
};

export default JobsPage;
