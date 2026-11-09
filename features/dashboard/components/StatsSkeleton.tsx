import { Skeleton } from "@/components/ui/skeleton";
import { StatsGrid } from "./StatsGrid";
import { STATS } from "../types";

export const StatsSkeleton = () => {
  return (
    <StatsGrid>
      {Array.from({ length: STATS.length }, (_, i) => (
        <Skeleton key={i} className="h-23 rounded-xl" />
      ))}
    </StatsGrid>
  );
};
