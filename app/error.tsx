"use client";

import { ErrorState } from "@/components/ErrorState";
import { MessageCircleWarning } from "lucide-react";

type ErrorPageProps = {
  error: unknown;
  retry: () => void;
};

const ErrorPage = ({ error, retry }: ErrorPageProps) => {
  console.error(error);
  return (
    <ErrorState
      title="Error!!!"
      description="Something went wrong!"
      onRetry={retry}
      icon={<MessageCircleWarning />}
    ></ErrorState>
  );
};

export default ErrorPage;
