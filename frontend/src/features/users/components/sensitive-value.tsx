import { Badge } from "@/components/ui/badge";

export function SensitiveValue({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border/70 bg-muted/50 px-2 py-1">
      <Badge variant="outline">{label}</Badge>
      <span className="font-mono text-xs text-foreground">{value}</span>
    </span>
  );
}
