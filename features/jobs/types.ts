export const APPLICATION_STATUSES = [
  "applied",
  "interview",
  "offer",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
