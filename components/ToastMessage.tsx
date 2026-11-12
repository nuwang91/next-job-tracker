"use client";

import { useEffect } from "react";
import { toast } from "./ui/toast";

type ToastMessageProps = {
  type: "success" | "info" | "warning" | "error";
  message: string;
  id: string;
};

export const ToastMessage = ({ message, type, id }: ToastMessageProps) => {
  useEffect(() => {
    toast.add({
      type,
      description: message,
      id,
    });
  }, [type, message, id]);

  return null;
};
