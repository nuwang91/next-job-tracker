import "server-only";
import { Pool } from "pg";

// In dev, hot reload re-runs modules; reuse one pool instead of opening new connections each time
const globalForDb = globalThis as typeof globalThis & { pgPool?: Pool };

export const pool =
  globalForDb.pgPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForDb.pgPool = pool;
