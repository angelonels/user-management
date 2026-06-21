import { Badge } from "@/components/ui/badge";

export function UserStatusBadge({ deletedAt }: { deletedAt?: string | null }) {
  return deletedAt ? <Badge variant="secondary">Archived</Badge> : <Badge>Active</Badge>;
}
