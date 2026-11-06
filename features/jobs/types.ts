export const APPLICATION_STATUSES = [
  "applied",
  "interview",
  "offer",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface JobApplication {
  id: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  notes: string | null;
  createdAt: Date;
  interviews: number;
}

export interface Interview {
  id: string;
  date: string;
  done: boolean;
}

export type JobInput = Pick<
  JobApplication,
  "company" | "role" | "status" | "notes"
>;

export type CreatedJob = Pick<JobApplication, "id">;

export const isValidStatus = (value: unknown): value is ApplicationStatus => {
  return APPLICATION_STATUSES.includes(value as ApplicationStatus);
};
