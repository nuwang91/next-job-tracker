export const APPLICATION_STATUSES = [
  "applied",
  "interview",
  "offer",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  notes?: string;
  createdAt: string;
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

export type CreatedJob = Omit<JobApplication, "interviews">;

export const isValidStatus = (value: unknown): value is ApplicationStatus => {
  return APPLICATION_STATUSES.includes(value as ApplicationStatus);
};
