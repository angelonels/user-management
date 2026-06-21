export type UserStatus = "active" | "deleted" | "all";
export type UserSortBy = "createdAt" | "name" | "email" | "dateOfBirth";
export type SortOrder = "asc" | "desc";

export type UserListItem = {
  id: number;
  name: string;
  email: string;
  primaryMobile: string;
  aadhaarMasked: string;
  panMasked: string;
  dateOfBirth: string;
  createdAt: string;
  deletedAt: string | null;
};

export type UserDetail = {
  id: number;
  name: string;
  email: string;
  primaryMobile: string;
  secondaryMobile?: string | null;
  aadhaar: string;
  pan: string;
  dateOfBirth: string;
  placeOfBirth: string;
  currentAddress: string;
  permanentAddress: string;
  isPermanentAddressSameAsCurrent: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type UserFormValues = {
  name: string;
  email: string;
  primaryMobile: string;
  secondaryMobile?: string;
  aadhaar: string;
  pan: string;
  dateOfBirth: string;
  placeOfBirth: string;
  currentAddress: string;
  permanentAddress: string;
  isPermanentAddressSameAsCurrent: boolean;
};

export type UsersFilters = {
  page: number;
  pageSize: number;
  search: string;
  status: UserStatus;
  sortBy: UserSortBy;
  sortOrder: SortOrder;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type UsersListResponse = {
  data: UserListItem[];
  meta: PaginationMeta;
};

export type UserDetailResponse = {
  data: UserDetail;
};
