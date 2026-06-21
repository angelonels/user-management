import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <main id="main-content" className={cn("mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10", className)} {...props} />;
}
