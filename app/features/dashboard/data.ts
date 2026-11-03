import { pool } from "@/lib/db";

export const getDashboardStats = async () => {
  const { rows } = await pool.query<{ status: string; count: number }>(
    "select status, count(*)::int as count from jobs group by status",
  );
  return rows;
};
