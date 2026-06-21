import { Button } from "@/components/ui/button";
import type { PaginationMeta } from "../types/user.types";

type UsersPaginationProps = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
};

export function UsersPagination({ meta, onPageChange }: UsersPaginationProps) {
  return (
    <nav
      className="flex flex-col gap-3 rounded-lg border border-border/80 bg-card p-4 text-sm text-muted-foreground shadow-panel sm:flex-row sm:items-center sm:justify-between"
      aria-label="Pagination"
    >
      <span className="font-medium text-foreground">
        Page {meta.page} of {Math.max(meta.totalPages, 1)} · {meta.total} profiles
      </span>
      <div className="flex gap-2">
        <Button variant="outline" disabled={!meta.hasPreviousPage} onClick={() => onPageChange(meta.page - 1)}>
          Previous
        </Button>
        <Button variant="outline" disabled={!meta.hasNextPage} onClick={() => onPageChange(meta.page + 1)}>
          Next
        </Button>
      </div>
    </nav>
  );
}
