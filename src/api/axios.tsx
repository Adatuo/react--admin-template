import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig, type AxiosRequestHeaders } from 'axios';

const baseUrl = '/api';

interface IConfig extends AxiosRequestConfig {
  baseUrl: string;
  headers: AxiosRequestHeaders; // 确保 headers 是正确的类型
}

class HttpRequest {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig(): IConfig {
    const config: IConfig = {
      baseUrl: this.baseUrl,
      headers: {} as AxiosRequestHeaders, // 默认为空对象，并通过类型断言确保它是 AxiosRequestHeaders 类型
    };
    return config;
  }

  interceptors(instance: AxiosInstance): void {
    // 添加请求拦截器
    instance.interceptors.request.use(
      // AxiosRequestConfig -> InternalAxiosRequestConfig
      (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        return config;
      },
      (error: unknown) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response;
      },
      (error: unknown) => {
        console.log(error, 'error');
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  request(options: AxiosRequestConfig): Promise<AxiosResponse> {
    const instance: AxiosInstance = axios.create();
    options = { ...this.getInsideConfig(), ...options };
    this.interceptors(instance);
    return instance(options);  // 返回的是一个 Promise<AxiosResponse>
  }
}

export default new HttpRequest(baseUrl);
