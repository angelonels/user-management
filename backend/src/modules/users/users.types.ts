import type { NewUserRow, UserRow } from "../../shared/database/schema/users.schema.js";

export type User = UserRow;
export type NewUser = NewUserRow;

export type ListUsersFilters = {
  page: number;
  pageSize: number;
  search?: string;
  status: "active" | "deleted" | "all";
  sortBy: "createdAt" | "name" | "email" | "dateOfBirth";
  sortOrder: "asc" | "desc";
};

export type UserListResult = {
  users: User[];
  total: number;
};

