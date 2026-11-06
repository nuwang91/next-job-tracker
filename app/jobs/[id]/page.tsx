import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type JobDetailsProps = {
  params: Promise<{ id: string }>;
};

const JobDetails = async ({ params }: JobDetailsProps) => {
  const { id } = await params;
  return <span>{id}</span>;
};

const JobsPage = ({ params }: PageProps<"/jobs/[id]">) => {
  return (
    <main>
      <h1>Job Details</h1>
      <Suspense fallback={<Skeleton className="h-32 w-full rounded-xl" />}>
        <JobDetails params={params}></JobDetails>
      </Suspense>
    </main>
  );
};

export default JobsPage;
