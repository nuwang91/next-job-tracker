"use client";

import { useEffect } from "react";
import { toast } from "./ui/toast";

type ToastMessageProps = {
  type: "success" | "info" | "warning" | "error";
  message: string;
};

export const ToastMessage = ({ message, type }: ToastMessageProps) => {
  useEffect(() => {
    toast.add({
      type,
      description: message,
    });

    return () => toast.close();
  }, [type, message]);

  return null;
};
