import { ArchiveRestore, CheckCircle2, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { PaginationMeta, UserListItem, UserStatus } from "../types/user.types";

type UsersSummaryProps = {
  users: UserListItem[];
  meta?: PaginationMeta;
  search: string;
  status: UserStatus;
};

export function UsersSummary({ users, meta, search, status }: UsersSummaryProps) {
  const archivedVisible = users.filter((user) => user.deletedAt).length;
  const activeVisible = users.length - archivedVisible;
  const total = Math.max(meta?.total ?? 0, users.length, 1);
  const viewLabel = status === "deleted" ? "Archived" : status === "all" ? "All profiles" : "Active";
  const metrics = [
    {
      label: "Matching profiles",
      value: meta?.total ?? 0,
      helper: search ? "filtered by search" : viewLabel,
      progress: meta?.total ? 100 : 0,
      icon: Users
    },
    {
      label: "Visible active",
      value: activeVisible,
      helper: "shown in this view",
      progress: Math.round((activeVisible / total) * 100),
      icon: CheckCircle2
    },
    {
      label: "Visible archived",
      value: archivedVisible,
      helper: "available to restore",
      progress: Math.round((archivedVisible / total) * 100),
      icon: ArchiveRestore
    }
  ];

  return (
    <aside className="enter-up rounded-lg border border-border/80 bg-card p-5 shadow-panel xl:sticky xl:top-24 xl:h-fit">
      <div className="mb-5">
        <p className="text-sm font-semibold text-foreground">Directory snapshot</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          A quick read on the profiles currently in view.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              className="rounded-lg border border-border/70 bg-background/70 p-4"
              key={metric.label}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold leading-none">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.helper}</p>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <Progress className="mt-5" value={metric.progress} />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
