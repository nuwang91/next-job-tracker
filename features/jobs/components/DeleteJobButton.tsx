"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type DeleteJobButtonProps = {
  role: string;
  company: string;
};

export const DeleteJobButton = ({ company, role }: DeleteJobButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon-sm"
      disabled={pending}
      aria-label={`Delete ${role} at ${company}`}
    >
      <Trash2 />
    </Button>
  );
};
