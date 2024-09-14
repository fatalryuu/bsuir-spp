export interface LoginBody {
  email: string;
  password: string;
}

export interface AccessTokenPayload {
  id: string;
  fullName: string;
  email: string;
}
