import axiosInstance from '.';
import {
  CreateUserBody,
  CreateUserResponse,
  EditUserPayload,
  EditUserResponse,
  GetUsersQuery,
  GetUsersResponse,
} from '../types/users';

export const getUsers = async (query: GetUsersQuery): Promise<GetUsersResponse> => {
  const { filters } = query;

  let queryString = '?';

  if (filters.admin !== undefined) queryString += `admin=${filters.admin}`;

  const response = await axiosInstance
    .get<GetUsersResponse>(`/users/${queryString}`)
    .then((response) => response.data);

  return response;
};

export const createUser = async (body: CreateUserBody): Promise<CreateUserResponse> => {
  const response = await axiosInstance
    .post<CreateUserResponse>('/users', body)
    .then((response) => response.data);

  return response;
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await axiosInstance
    .delete<void>(`/users/${id}`)
    .then((response) => response.data);

  return response;
};

export const editUser = async (payload: EditUserPayload): Promise<EditUserResponse> => {
  const { id, ...body } = payload;

  const response = await axiosInstance
    .patch<EditUserResponse>(`/users/${id}`, body)
    .then((response) => response.data);

  return response;
};
