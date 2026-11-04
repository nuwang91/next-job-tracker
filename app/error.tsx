"use client";

import { ErrorState } from "@/components/ErrorState";
import { MessageCircleWarning } from "lucide-react";

type ErrorPageProps = {
  error: unknown;
  retry: () => void;
};

const ErrorPage = ({ error, retry }: ErrorPageProps) => {
  return (
    <ErrorState
      title="Error!!!"
      description={
        error instanceof Error ? error.message : "Something went wrong!"
      }
      onRetry={retry}
      icon={<MessageCircleWarning />}
    ></ErrorState>
  );
};

export default ErrorPage;
