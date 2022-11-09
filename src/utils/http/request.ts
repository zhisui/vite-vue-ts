import { IResponse } from '@/types/request';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { showMessage } from './status';


const baseURL = 'https://kqszlw.kq.gov.cn:10443/api/kqszlw';

// 自定义axios实例
const instance: AxiosInstance = axios.create({
    baseURL,
    timeout: 15000, //如果请求话费了超过 `timeout` 的时间，请求将被中断
    withCredentials: true, // 许跨域设置，不然可能因为拿不到cookie而报错
});

//请求拦截器
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    },
);

// 响应拦截器
instance.interceptors.response.use((response:AxiosResponse) => {
    if (response.status === 200) {
        return response;
      }
      console.log(showMessage(response.status))
      return response;
})

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
    const conf = config;
    return new Promise((resolve) => {
        instance.request<any, AxiosResponse<T>>(conf).then((res: AxiosResponse<T>) => {
        resolve(res.data as T);
      });
    });
  };

export default request;
