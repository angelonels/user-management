import { Link } from "react-router-dom";
import { Archive, Eye, Pencil, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatDate } from "../../../lib/utils/format-date";
import type { UserListItem } from "../types/user.types";
import { SensitiveValue } from "./sensitive-value";
import { UserStatusBadge } from "./user-status-badge";

type UsersTableProps = {
  users: UserListItem[];
  onDelete: (user: UserListItem) => void;
  onRestore: (id: number) => void;
  restoringId?: number;
};

export function UsersTable({ users, onDelete, onRestore, restoringId }: UsersTableProps) {
  return (
    <section className="enter-up overflow-hidden rounded-lg border border-border/80 bg-card shadow-panel">
      <div className="grid gap-3 p-3 md:hidden">
        {users.map((user) => (
          <article className="rounded-lg border border-border/70 bg-background/70 p-4" key={user.id}>
            <div className="flex items-start gap-3">
              <Avatar className="size-11 rounded-lg">
                <AvatarFallback className="rounded-lg bg-secondary font-semibold text-secondary-foreground">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold">{user.name}</h2>
                    <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <UserStatusBadge deletedAt={user.deletedAt} />
                </div>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Mobile</dt>
                    <dd className="mt-1 font-medium">{user.primaryMobile}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Identity</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      <SensitiveValue label="Aadhaar" value={user.aadhaarMasked} />
                      <SensitiveValue label="PAN" value={user.panMasked} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Date of birth</dt>
                    <dd className="mt-1 font-medium">{formatDate(user.dateOfBirth)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to={`/users/${user.id}`}>
                  <Eye data-icon="inline-start" />
                  View
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to={`/users/${user.id}/edit`}>
                  <Pencil data-icon="inline-start" />
                  Edit
                </Link>
              </Button>
              {user.deletedAt ? (
                <Button variant="outline" size="sm" disabled={restoringId === user.id} onClick={() => onRestore(user.id)}>
                  <RotateCcw data-icon="inline-start" />
                  Restore
                </Button>
              ) : (
                <Button variant="destructive" size="sm" onClick={() => onDelete(user)}>
                  <Archive data-icon="inline-start" />
                  Archive
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/70 hover:bg-muted/70">
              <TableHead className="min-w-[220px] px-4">User</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead className="min-w-[210px]">Identity</TableHead>
              <TableHead className="hidden 2xl:table-cell">Date of birth</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="px-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow className="bg-card transition-colors hover:bg-muted/55" key={user.id}>
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-secondary font-semibold text-secondary-foreground">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{user.name}</div>
                      <div className="mt-1 text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.primaryMobile}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <SensitiveValue label="Aadhaar" value={user.aadhaarMasked} />
                    <SensitiveValue label="PAN" value={user.panMasked} />
                  </div>
                </TableCell>
                <TableCell className="hidden 2xl:table-cell">{formatDate(user.dateOfBirth)}</TableCell>
                <TableCell>
                  <UserStatusBadge deletedAt={user.deletedAt} />
                </TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex justify-end gap-1.5">
                    <Button asChild variant="ghost" size="icon-sm">
                      <Link to={`/users/${user.id}`} aria-label={`View ${user.name}`} title="View profile">
                        <Eye className="size-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon-sm">
                      <Link to={`/users/${user.id}/edit`} aria-label={`Edit ${user.name}`} title="Edit profile">
                        <Pencil className="size-4" />
                      </Link>
                    </Button>
                    {user.deletedAt ? (
                      <Button
                        variant="outline"
                        size="icon-sm"
                        disabled={restoringId === user.id}
                        onClick={() => onRestore(user.id)}
                        aria-label={`Restore ${user.name}`}
                        title="Restore profile"
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => onDelete(user)}
                        aria-label={`Archive ${user.name}`}
                        title="Archive profile"
                      >
                        <Archive className="size-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
