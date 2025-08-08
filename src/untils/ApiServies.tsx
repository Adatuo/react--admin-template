import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

class ApiService {
  //声明私有实例
  private readonly _instance: AxiosInstance;

  constructor(baseURL: string) {
    this._instance = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      // headers: ,
    });
  }

  //拦截器封装
  

  //请求TS封装,{}用Record<string, unknown>替代
  async get<TResponse, TParameter = Record<string, unknown>>(
    url: string,
    params?: TParameter,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    if (params) {
      config = config || {};
      config.params = params;
    }
    return await this._instance.get<TResponse>(url, config);
  }

  async post<TResponse, TBody = Record<string, unknown>>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return await this._instance.post<TResponse>(url, data, config);
  }

  async put<TResponse, TBody = Record<string, unknown>>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return await this._instance.put<TResponse>(url, data, config);
  }

  async delete<TResponse, TParameter = Record<string, unknown>>(
    url: string,
    params?: TParameter,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    if (params) {
      config = config || {};
      config.params = params;
    }
    return await this._instance.delete<TResponse>(url, config);
  }

  get baseUrl(): string | undefined {
    return this._instance.defaults.baseURL;
  }
}

export default ApiService;
