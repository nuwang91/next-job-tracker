import "server-only";
import { pool } from "@/lib/db";
import { connection } from "next/server";
import { DashboardStats } from "./types";
import { ApplicationStatus } from "../jobs/types";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  await connection();
  const { rows } = await pool.query<{
    status: ApplicationStatus;
    count: number;
  }>(
    `SELECT
    s.status,
    COUNT(j.id)::int AS count
FROM (
    VALUES
        ('applied'),
        ('interview'),
        ('offer'),
        ('rejected')
) AS s(status)
LEFT JOIN jobs j
    ON j.status = s.status
GROUP BY s.status
ORDER BY s.status;`,
  );

  const { rows: totalJobs } = await pool.query<{ total_jobs: number }>(
    `select COUNT(*)::int as total_jobs from jobs`,
  );

  const { rows: totalInterviews } = await pool.query<{
    total_interviews: number;
  }>(
    `select count(i.id)::int as total_interviews from jobs j left join interviews i on i.job_id = j.id where i.done = false`,
  );

  return {
    appliedCount: rows.find(({ status }) => status === "applied")?.count ?? 0,
    interviewCount:
      rows.find(({ status }) => status === "interview")?.count ?? 0,
    offerCount: rows.find(({ status }) => status === "offer")?.count ?? 0,
    rejectedCount: rows.find(({ status }) => status === "rejected")?.count ?? 0,
    pendingInterviews: totalInterviews[0].total_interviews ?? 0,
    totalApplications: totalJobs[0].total_jobs ?? 0,
  };
};
