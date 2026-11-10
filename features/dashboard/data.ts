import "server-only";
import { pool } from "@/lib/db";
import type { DashboardStats } from "./types";
import { cacheLife, cacheTag } from "next/cache";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");
  const { rows } = await pool.query<DashboardStats>(`
    SELECT
      COUNT(j.id)::int AS "totalApplications",

      COUNT(j.id) FILTER (WHERE j.status = 'applied')::int AS "appliedCount",

      COUNT(j.id) FILTER (WHERE j.status = 'interview')::int AS "interviewCount",

      COUNT(j.id) FILTER (WHERE j.status = 'offer')::int AS "offerCount",

      COUNT(j.id) FILTER (WHERE j.status = 'rejected')::int AS "rejectedCount",

      (
        SELECT COUNT(*)::int
        FROM interviews i
        WHERE i.done = false
      ) AS "pendingInterviews"

    FROM jobs j;
  `);

  return rows[0];
};
