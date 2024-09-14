import axiosInstance from '.';
import { LoginBody } from '../types/auth';

export const login = async (body: LoginBody): Promise<void> => {
  await axiosInstance.post<void>('/auth/login', body).then((response) => response.data);
};
