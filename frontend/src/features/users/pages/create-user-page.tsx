import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Container } from "../../../components/layout/container";
import { PageHeader } from "../../../components/layout/page-header";
import { Button } from "@/components/ui/button";
import { UserForm } from "../components/user-form";
import { useCreateUser } from "../hooks/use-users";
import type { UserFormValues } from "../types/user.types";

export function CreateUserPage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  function handleSubmit(values: UserFormValues) {
    createUser.mutate(values, {
      onSuccess: () => navigate("/users?created=1")
    });
  }

  return (
    <Container className="flex max-w-6xl flex-col gap-6">
      <PageHeader
        title="New profile"
        description="Add the essentials in a focused pass, then return to the directory."
        action={
          <Link to="/users">
            <Button variant="outline">
              <ArrowLeft data-icon="inline-start" />
              Back to people
            </Button>
          </Link>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="enter-up rounded-lg border border-border/80 bg-card p-5 shadow-panel lg:sticky lg:top-24">
          <p className="text-sm font-semibold">Profile flow</p>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            {["Basic details", "Contact details", "Identity details", "Address"].map((item, index) => (
              <li className="flex items-center gap-3" key={item}>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-xs font-semibold text-foreground">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-border/80 pt-4 text-sm leading-6 text-muted-foreground">
            Save when each section is complete. The directory will update after the profile is added.
          </p>
        </aside>
        <UserForm
          isSubmitting={createUser.isPending}
          serverError={createUser.error}
          submitLabel="Add profile"
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
}
