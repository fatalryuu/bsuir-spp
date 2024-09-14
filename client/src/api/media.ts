import axiosInstance from '.';
import { UploadResponse } from '../types/media';

export const upload = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance
    .post<UploadResponse>('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);

  return response;
};
