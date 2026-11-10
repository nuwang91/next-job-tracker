import "server-only";
import { JobApplication } from "./types";
import { pool } from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

export const getJobs = async (): Promise<JobApplication[]> => {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");

  const { rows } = await pool.query<JobApplication>(
    `select j.id, j.company, j.role, j.status, j.notes, j.created_at as "createdAt", count(i.id)::int as interviews from jobs j
      left join interviews i on i.job_id = j.id group by j.id order by j.created_at desc;`,
  );

  return rows;
};
