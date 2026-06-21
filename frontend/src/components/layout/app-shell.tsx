import { Link, NavLink, Outlet } from "react-router-dom";
import { Moon, Sun, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppShellProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export function AppShell({ isDark, onToggleTheme }: AppShellProps) {
  return (
    <div className="min-h-[100dvh] bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-panel"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/users" className="group flex min-w-0 items-center gap-3 text-sm font-semibold">
            <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-[0_14px_34px_-24px_hsl(var(--primary))]">
              <UsersRound className="size-5" aria-hidden="true" />
              <span className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-accent" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[15px] font-semibold">Directory</span>
              <span className="block truncate text-xs font-medium text-muted-foreground">People profiles</span>
            </span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-2">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              People
            </NavLink>
            <Button variant="outline" size="icon-sm" onClick={onToggleTheme} aria-label="Toggle color theme">
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
