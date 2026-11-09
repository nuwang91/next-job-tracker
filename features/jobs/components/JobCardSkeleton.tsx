import { Skeleton } from "@/components/ui/skeleton";

export const JobCardSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((value) => (
        <li key={value}>
          <Skeleton className="h-32 w-full rounded-xl" />
        </li>
      ))}
    </>
  );
};
