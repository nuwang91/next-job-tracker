import "server-only";
import { JobApplication } from "./types";
import { pool } from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

export const getJobs = async (query: string): Promise<JobApplication[]> => {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");

  // Allow users to search for literal % and _ characters rather than wildcards, escape them before constructing the pattern.
  // Input	Output
  // "Google"	"Google"
  // "50%"	"50\\%"
  // "job_title"	"job\\_title"
  // "C:\\Jobs"	"C:\\\\Jobs"
  // "100%_complete"	"100\\%\\_complete"
  // escape characters that have special meaning in SQL LIKE patterns: % and _ and \. The replacement string uses $& to refer to the matched substring, so it will prefix each of these characters with a backslash.
  const q = query.replace(/[\\%_]/g, "\\$&");

  // The % wildcard means any number of characters before or after search text
  // If the search text is empty, return all jobs. Otherwise, return jobs where the company or role contains the search text, case-insensitive.
  // The ($1 = '' or j.company ilike $2 or j.role ilike $2) condition checks if the search text is empty. If it is, the condition evaluates to true, and all jobs are returned. If the search text is not empty, the condition checks if the company or role contains the search text, case-insensitive.
  const { rows } = await pool.query<JobApplication>(
    `select j.id, j.company, j.role, j.status, j.notes, j.created_at as "createdAt", count(i.id)::int as interviews from jobs j
      left join interviews i on i.job_id = j.id where ($1 = '' or j.company ilike $2 or j.role ilike $2) group by j.id order by j.created_at desc;`,
    [q, `%${q}%`],
  );

  return rows;
};
