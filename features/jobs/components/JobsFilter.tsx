"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const JobsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("q") ?? "");
  return (
    <>
      <Input
        id="search"
        name="search"
        value={filter}
        onChange={(e) => {
          const text = e.target.value;
          setFilter(text);
          const params = new URLSearchParams(searchParams.toString());

          if (text.trim()) {
            params.set("q", text);
          } else {
            params.delete("q");
          }

          const query = params.toString();

          router.replace(query ? `/jobs?${query}` : "/jobs");
        }}
      ></Input>
    </>
  );
};
