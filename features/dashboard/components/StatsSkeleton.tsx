import { Skeleton } from "@/components/ui/skeleton";
import { StatsGrid } from "./StatsGrid";

export const StatsSkeleton = () => {
  return (
    <StatsGrid>
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-23 rounded-xl" />
      ))}
    </StatsGrid>
  );
};
