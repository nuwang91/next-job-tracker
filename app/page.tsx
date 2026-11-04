import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { StatsSkeleton } from "@/features/dashboard/components/StatsSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsCards />
      </Suspense>
    </main>
  );
}
