"use client";
import { ToastMessage } from "@/components/ToastMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const JobCreatedToast = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("created");
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("created");
    const query = params.toString();
    router.replace(query ? `/jobs?${query}` : "/jobs", { scroll: false });
  });
  return (
    <ToastMessage
      type="success"
      message="Job Created"
      id={`job-created-${id}`}
    ></ToastMessage>
  );
};
