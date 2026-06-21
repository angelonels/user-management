import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import { ErrorState } from "../../../components/feedback/error-state";
import { Container } from "../../../components/layout/container";
import { PageHeader } from "../../../components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserForm } from "../components/user-form";
import { useUpdateUser, useUser } from "../hooks/use-users";
import type { UserFormValues } from "../types/user.types";
import { userToFormValues } from "../utils/user-formatters";

export function EditUserPage() {
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const userQuery = useUser(id);
  const updateUser = useUpdateUser(id);

  function handleSubmit(values: UserFormValues) {
    updateUser.mutate(values, {
      onSuccess: () => navigate(`/users/${id}?updated=1`)
    });
  }

  return (
    <Container className="flex max-w-6xl flex-col gap-6">
      <PageHeader
        title="Edit profile"
        description="Refresh the details that changed and keep the profile easy to review."
        action={
          <div className="flex gap-2">
            <Link to="/users">
              <Button variant="ghost">
                <ArrowLeft data-icon="inline-start" />
                People
              </Button>
            </Link>
            <Link to={`/users/${id}`}>
              <Button variant="outline">
                <Eye data-icon="inline-start" />
                View profile
              </Button>
            </Link>
          </div>
        }
      />
      {userQuery.isLoading ? (
        <section className="rounded-lg border border-border/80 bg-card p-6 shadow-panel">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-24" />
          </div>
        </section>
      ) : null}
      {userQuery.isError ? (
        <ErrorState title="Profile unavailable" description="This profile could not be loaded." onRetry={() => userQuery.refetch()} />
      ) : null}
      {userQuery.data ? (
        <div className="max-w-4xl">
          <UserForm
            defaultValues={userToFormValues(userQuery.data.data)}
            isSubmitting={updateUser.isPending}
            serverError={updateUser.error}
            submitLabel="Save changes"
            onSubmit={handleSubmit}
          />
        </div>
      ) : null}
    </Container>
  );
}
