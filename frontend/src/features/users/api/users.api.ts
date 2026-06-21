import { apiClient } from "../../../lib/api/api-client";
import type {
  UserDetailResponse,
  UserFormValues,
  UsersFilters,
  UsersListResponse
} from "../types/user.types";

export const usersApi = {
  list(filters: UsersFilters) {
    return apiClient<UsersListResponse>("/users", { query: filters });
  },
  get(id: number) {
    return apiClient<UserDetailResponse>(`/users/${id}`);
  },
  create(values: UserFormValues) {
    return apiClient<UserDetailResponse>("/users", { method: "POST", body: values });
  },
  update(id: number, values: UserFormValues) {
    return apiClient<UserDetailResponse>(`/users/${id}`, { method: "PATCH", body: values });
  },
  delete(id: number) {
    return apiClient<UserDetailResponse>(`/users/${id}`, { method: "DELETE" });
  },
  restore(id: number) {
    return apiClient<UserDetailResponse>(`/users/${id}/restore`, { method: "PATCH" });
  }
};
