import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavLink from "@/components/NavLink";
import { Toaster } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Job Tracker",
  description: "App is created to track job applications and interviews.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b">
          <nav className="mx-auto flex max-w-3xl items-center gap-4 p-4 text-sm">
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/jobs">Jobs</NavLink>
            <NavLink href="/jobs/new">New job</NavLink>
          </nav>
        </header>
        <div className="mx-auto w-full max-w-3xl px-4 py-8">{children}</div>
      </body>
      <Toaster />
    </html>
  );
}
