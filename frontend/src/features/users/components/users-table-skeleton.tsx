import { Skeleton } from "@/components/ui/skeleton";

export function UsersTableSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border border-border/80 bg-card p-4 shadow-panel">
      <div className="mb-4 grid gap-3 sm:grid-cols-[2fr_1fr_1fr_1fr]">
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <div className="grid grid-cols-1 gap-3 rounded-lg border border-border/70 p-3 sm:grid-cols-6" key={index}>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Skeleton className="size-10 rounded-lg" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>
        ))}
      </div>
    </section>
  );
}
