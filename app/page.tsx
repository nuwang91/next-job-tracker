import { PageHeader } from "@/components/PageHeader";
import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { StatsSkeleton } from "@/features/dashboard/components/StatsSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <PageHeader title="Dashboard"></PageHeader>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsCards />
      </Suspense>
    </main>
  );
}
