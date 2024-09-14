export interface GetUsersQuery {
  admin?: 'true' | 'false';
}

export interface PatchUserBody {
  fullName: string;
  email: string;
  admin: boolean;
}
