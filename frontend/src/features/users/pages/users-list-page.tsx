import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "../../../components/layout/container";
import { PageHeader } from "../../../components/layout/page-header";
import { EmptyState } from "../../../components/feedback/empty-state";
import { ErrorState } from "../../../components/feedback/error-state";
import type { UserListItem, UserSortBy, UserStatus } from "../types/user.types";
import { useDeleteUser, useRestoreUser, useUsers } from "../hooks/use-users";
import { UserDeleteDialog } from "../components/user-delete-dialog";
import { UsersPagination } from "../components/users-pagination";
import { UsersTable } from "../components/users-table";
import { UsersTableSkeleton } from "../components/users-table-skeleton";
import { UsersToolbar } from "../components/users-toolbar";
import { UsersSummary } from "../components/users-summary";

export function UsersListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatus>("active");
  const [sortBy, setSortBy] = useState<UserSortBy>("createdAt");
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);

  const filters = useMemo(
    () => ({ page, pageSize: 10, search, status, sortBy, sortOrder: "desc" as const }),
    [page, search, status, sortBy]
  );
  const usersQuery = useUsers(filters);
  const deleteUser = useDeleteUser();
  const restoreUser = useRestoreUser();

  const users = usersQuery.data?.data ?? [];
  const isFiltered = Boolean(search) || status !== "active";

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value: UserStatus) {
    setStatus(value);
    setPage(1);
  }

  return (
    <Container className="flex flex-col gap-6">
      <PageHeader
        title="People"
        description="Find profiles quickly, review the essentials, and keep the directory tidy."
        action={
          <Link to="/users/new">
            <Button>
              <Plus data-icon="inline-start" />
              New profile
            </Button>
          </Link>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-start">
        <div className="flex min-w-0 flex-col gap-4">
          <UsersToolbar
            search={search}
            status={status}
            sortBy={sortBy}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onSortChange={(value) => {
              setSortBy(value);
              setPage(1);
            }}
          />
          {usersQuery.isLoading ? <UsersTableSkeleton /> : null}
          {usersQuery.isError ? (
            <ErrorState
              title="Directory unavailable"
              description="Profiles could not be loaded. Check your connection and try again."
              onRetry={() => usersQuery.refetch()}
            />
          ) : null}
          {usersQuery.isSuccess && users.length === 0 ? (
            <EmptyState
              title={isFiltered ? "No profiles found" : "No profiles yet"}
              description={
                isFiltered
                  ? "Adjust the search or switch views to broaden the results."
                  : "Add the first profile to start building the directory."
              }
              action={
                <Link to="/users/new">
                  <Button>
                    <Plus data-icon="inline-start" />
                    New profile
                  </Button>
                </Link>
              }
            />
          ) : null}
          {usersQuery.isSuccess && users.length > 0 ? (
            <>
              <UsersTable
                users={users}
                restoringId={restoreUser.variables}
                onDelete={setSelectedUser}
                onRestore={(id) => restoreUser.mutate(id)}
              />
              <UsersPagination meta={usersQuery.data.meta} onPageChange={setPage} />
            </>
          ) : null}
        </div>
        <UsersSummary
          users={users}
          meta={usersQuery.data?.meta}
          search={search}
          status={status}
        />
      </div>
      <UserDeleteDialog
        user={selectedUser}
        isBusy={deleteUser.isPending}
        onClose={() => setSelectedUser(null)}
        onConfirm={() => {
          if (selectedUser) {
            deleteUser.mutate(selectedUser.id, { onSuccess: () => setSelectedUser(null) });
          }
        }}
      />
    </Container>
  );
}
