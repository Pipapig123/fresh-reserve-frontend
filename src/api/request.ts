import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

interface ResType<T = any> {
  code: number;
  data: T;
  message: string;
}

const httpRequest = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpRequest.interceptors.request.use(config => {
  return config;
});
httpRequest.interceptors.response.use((response: AxiosResponse<ResType>) => {
  const { data } = response;
  return data as unknown as AxiosResponse<ResType>;
});
type HttpRequest = {
  <T = any>(config: AxiosRequestConfig): Promise<ResType<T>>;
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<ResType<T>>;
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<ResType<T>>;
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<ResType<T>>;
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<ResType<T>>;
};
export default httpRequest as unknown as HttpRequest;


