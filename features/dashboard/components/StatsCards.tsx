import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { STATS } from "@/features/dashboard/types";
import { getDashboardStats } from "../data";
import { StatsGrid } from "./StatsGrid";

export const StatsCards = async () => {
  const stats = await getDashboardStats();
  return (
    <StatsGrid>
      {STATS.map(({ key, label }) => {
        return (
          <Card key={key}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats[key]}
              </CardTitle>
            </CardHeader>
          </Card>
        );
      })}
    </StatsGrid>
  );
};
