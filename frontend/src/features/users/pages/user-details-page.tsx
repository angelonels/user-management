import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Pencil, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ErrorState } from "../../../components/feedback/error-state";
import { Container } from "../../../components/layout/container";
import { PageHeader } from "../../../components/layout/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "../../../lib/utils/format-date";
import { UserStatusBadge } from "../components/user-status-badge";
import { useUser } from "../hooks/use-users";

function DetailItem({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium leading-6 text-foreground">{value || "Not provided"}</dd>
    </div>
  );
}

function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="enter-up rounded-lg border border-border/80 bg-card p-5 shadow-panel">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function UserDetailsPage() {
  const id = Number(useParams().id);
  const userQuery = useUser(id);
  const user = userQuery.data?.data;

  return (
    <Container className="flex max-w-6xl flex-col gap-6">
      <PageHeader
        title="Profile"
        description="Review contact, identity, address, and profile history in one place."
        action={
          <div className="flex gap-2">
            <Link to="/users">
              <Button variant="ghost">
                <ArrowLeft data-icon="inline-start" />
                People
              </Button>
            </Link>
            <Link to={`/users/${id}/edit`}>
              <Button>
                <Pencil data-icon="inline-start" />
                Edit profile
              </Button>
            </Link>
          </div>
        }
      />
      {userQuery.isLoading ? (
        <section className="rounded-lg border border-border/80 bg-card p-6 shadow-panel">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </section>
      ) : null}
      {userQuery.isError ? (
        <ErrorState title="Profile unavailable" description="This profile could not be loaded. Try again in a moment." onRetry={() => userQuery.refetch()} />
      ) : null}
      {user ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="enter-up overflow-hidden rounded-lg border border-border/80 bg-card shadow-panel lg:col-span-2">
            <div className="border-b border-border/80 bg-muted/35 p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <Avatar className="size-16 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-primary text-lg font-semibold text-primary-foreground">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h2 className="truncate text-2xl font-semibold leading-tight">{user.name}</h2>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <UserStatusBadge deletedAt={user.deletedAt} />
              </div>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <DetailItem label="Email" value={user.email} />
              </div>
              <div className="flex items-start gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <DetailItem label="Primary mobile" value={user.primaryMobile} />
              </div>
              <div className="flex items-start gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                <DetailItem label="Place of birth" value={user.placeOfBirth} />
              </div>
            </div>
          </section>

          <div className="grid gap-6">
            <InfoPanel title="Contact">
              <dl className="grid gap-5 sm:grid-cols-2">
                <DetailItem label="Primary mobile" value={user.primaryMobile} />
                <DetailItem label="Secondary mobile" value={user.secondaryMobile} />
                <DetailItem label="Email" value={user.email} />
                <DetailItem label="Date of birth" value={formatDate(user.dateOfBirth)} />
              </dl>
            </InfoPanel>

            <InfoPanel title="Identity">
              <dl className="grid gap-5 sm:grid-cols-2">
                <DetailItem label="Aadhaar" value={user.aadhaar} />
                <DetailItem label="PAN" value={user.pan} />
              </dl>
            </InfoPanel>

            <InfoPanel title="Address">
              <dl className="grid gap-5">
                <DetailItem label="Current address" value={user.currentAddress} />
                <DetailItem label="Permanent address" value={user.permanentAddress} />
              </dl>
            </InfoPanel>
          </div>

          <InfoPanel title="History">
            <dl className="flex flex-col gap-4">
              <DetailItem label="Added" value={formatDate(user.createdAt)} />
              <Separator />
              <DetailItem label="Last updated" value={formatDate(user.updatedAt)} />
              <Separator />
              <DetailItem label="Archived" value={user.deletedAt ? formatDate(user.deletedAt) : "No"} />
              <Separator />
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                <dd className="mt-2">
                  <Badge variant={user.isPermanentAddressSameAsCurrent ? "default" : "secondary"}>
                    {user.isPermanentAddressSameAsCurrent ? "Same address" : "Separate address"}
                  </Badge>
                </dd>
              </div>
            </dl>
          </InfoPanel>
        </div>
      ) : null}
    </Container>
  );
}
