import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/users.api";
import type { UserFormValues, UsersFilters } from "../types/user.types";

export function useUsers(filters: UsersFilters) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => usersApi.list(filters)
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => usersApi.get(id),
    enabled: Number.isFinite(id)
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: UserFormValues) => usersApi.create(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });
}

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: UserFormValues) => usersApi.update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    }
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => usersApi.delete(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    }
  });
}

export function useRestoreUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => usersApi.restore(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    }
  });
}
