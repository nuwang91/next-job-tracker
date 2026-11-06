"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={cn(
        "text-muted-foreground hover:text-foreground",
        isActive && "font-medium text-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
}
