import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

// get request
export const getRequest = async <T = any>(
  url: string,
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  try {
    const response = await apiClient.get(url, config);
    return response.data;
  } catch (err: any) {
    const status = err?.response?.status;

    // If caller explicitly opted out of auth, swallow backend 401s and
    // return a safe fallback shaped object so calling services can handle
    // it without the app throwing an unhandled AxiosError.
    if (config?.skipAuth && status === 401) {
      return ({
        statusCode: 401,
        statusMessage: "Unauthorized",
        data: null,
      } as unknown) as T;
    }

    throw err;
  }
};

// post request
export const postRequest = async <T = any>(
  url: string,
  data: any = {},
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.post(url, data, config);
  return response.data;
};

// put request
export const putRequest = async <T = any>(
  url: string,
  data: any = {},
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.put(url, data, config);
  return response.data;
};

// patch request
export const patchRequest = async <T = any>(
  url: string,
  data: any = {},
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.patch(url, data, config);
  return response.data;
};

// delete request
export const deleteRequest = async <T = any>(
  url: string,
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.delete(url, config);
  return response.data;
};

// 


