import { CollapsibleSection } from "@/components/CollapsibleSection";
import { PageHeader } from "@/components/PageHeader";
import { JobCardSkeleton } from "@/features/jobs/components/JobCardSkeleton";
import { JobsFilter } from "@/features/jobs/components/JobsFilter";
import { JobsList } from "@/features/jobs/components/JobsList";
import { Suspense } from "react";

type JobListingProps = {
  searchParams: Promise<{ created?: string; q?: string }>;
};

const JobListing = async ({ searchParams }: JobListingProps) => {
  const { created, q } = await searchParams;

  return (
    <>
      <JobsFilter></JobsFilter>
      <CollapsibleSection title="Applications">
        <JobsList
          id={typeof created === "string" ? created : undefined}
          query={q ?? ""}
        ></JobsList>
      </CollapsibleSection>
    </>
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
