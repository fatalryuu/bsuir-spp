export interface GetUsersQuery {
  filters: UsersFilters;
}

export interface UsersFilters {
  admin?: boolean;
}

export interface GetUsersResponse {
  users: User[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  admin: boolean;
}

export interface CreateUserBody {
  fullName: string;
  email: string;
  password: string;
  avatarUrl: string;
  admin: boolean;
}

export interface CreateUserResponse {
  user: User;
}

export interface EditUserPayload {
  id: string;
  fullName: string;
  email: string;
  admin: boolean;
}

export interface EditUserResponse {
  user: User;
}
