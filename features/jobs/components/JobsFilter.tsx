"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "../hooks/useDebounceValue";

export const JobsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("q") ?? "");
  const debounced = useDebounceValue(filter, 300);

  useEffect(() => {
    if (debounced == null) return;

    if (debounced === (searchParams.get("q") ?? "")) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debounced.trim()) {
      params.set("q", debounced);
    } else {
      params.delete("q");
    }
    params.delete("created");
    const query = params.toString();

    router.replace(query ? `/jobs?${query}` : "/jobs");
  }, [debounced, searchParams, router]);

  return (
    <>
      <Input
        type="search"
        id="search"
        name="search"
        aria-label="search jobs"
        placeholder="Search Jobs"
        value={filter}
        onChange={(e) => {
          const text = e.target.value;
          setFilter(text);
        }}
      ></Input>
    </>
  );
};
