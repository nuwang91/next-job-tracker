"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "../hooks/useDebounceValue";
import Form from "next/form";
import { Input } from "@/components/ui/input";

export const JobsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("q") ?? "");
  const debounced = useDebounceValue(filter, 300);

  useEffect(() => {
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
    <Form action="/jobs">
      <Input
        type="search"
        id="search"
        name="q"
        aria-label="search jobs"
        placeholder="Search Jobs"
        value={filter}
        onChange={(e) => {
          const text = e.target.value;
          setFilter(text);
        }}
      ></Input>
    </Form>
  );
};
