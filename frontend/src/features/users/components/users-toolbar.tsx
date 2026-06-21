import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import type { UserSortBy, UserStatus } from "../types/user.types";

type UsersToolbarProps = {
  search: string;
  status: UserStatus;
  sortBy: UserSortBy;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: UserStatus) => void;
  onSortChange: (value: UserSortBy) => void;
};

export function UsersToolbar({
  search,
  status,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange
}: UsersToolbarProps) {
  return (
    <section className="enter-up grid gap-3 rounded-lg border border-border/80 bg-card p-3 shadow-panel sm:grid-cols-[1fr_150px_170px]">
      <label className="flex flex-col gap-2 sm:col-span-1">
        <span className="text-sm font-medium">Search</span>
        <div className="relative">
          <Input
            className="h-11 pl-10"
            type="search"
            placeholder="Name, email, mobile, PAN, Aadhaar"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">View</span>
        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as UserStatus)}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="deleted">Archived</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">Sort</span>
        <Select
          value={sortBy}
          onValueChange={(value) => onSortChange(value as UserSortBy)}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="dateOfBirth">Date of birth</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </label>
    </section>
  );
}
