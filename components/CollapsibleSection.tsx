"use client";

import { ChevronDownIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ReactNode } from "react";

type CollapsibleSection = {
  title: string;
  children: ReactNode;
};

export const CollapsibleSection = ({ children, title }: CollapsibleSection) => {
  return (
    <Collapsible className="rounded-md data-open:bg-muted">
      <CollapsibleTrigger
        render={
          <Button variant="ghost" className="w-full">
            {title}
            <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
          </Button>
        }
      />
      <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};
