import { Suspense } from "react";
import NavLink from "./NavLink";
import { cn } from "cn";
import { Link } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/jobs", label: "Jobs" },
  { href: "/jobs/new", label: "New job" },
];

export const MainNav = () => {
  return (
    <nav className="mx-auto flex max-w-3xl items-center gap-4 p-4 text-sm">
      <Suspense
        fallback={links.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn("text-muted-foreground hover:text-foreground")}
            >
              {link.label}
            </Link>
          );
        })}
      >
        {links.map((link) => {
          return (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          );
        })}
      </Suspense>
    </nav>
  );
};
