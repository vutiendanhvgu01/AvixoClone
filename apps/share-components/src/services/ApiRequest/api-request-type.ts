import { AxiosError, AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
  originResponse: AxiosResponse<T>;
  data: T;
}

export interface ApiError extends Error {
  originError?: AxiosError | null;
  code?: string;
  errors: [];
  error_message: string;
  extras: [];
}
