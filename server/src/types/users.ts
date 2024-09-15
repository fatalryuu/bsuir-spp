export interface GetUsersQuery {
  admin?: 'true' | 'false';
}

export interface PatchUserBody {
  id: string;
  fullName: string;
  email: string;
  admin: boolean;
}
