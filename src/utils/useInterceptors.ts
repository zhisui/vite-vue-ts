import type { AxiosInstance } from 'axios';
import type VueRouter from 'vue-router';
import AxiosStatic from 'axios';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { checkAndGetUserInfo } from '@/utils/check';
import { pinia } from '@/stores';
import { Pinia } from 'pinia';

export function useInterceptors(axios: AxiosInstance, router: VueRouter, pinia?: Pinia) {
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页
    axios
        .interceptors
        .response
        .use(
            response => response,
            error => {
                if (AxiosStatic.isAxiosError(error) && error.response) {
                    switch (error.response.status) {
                        case 401:
                            router.replace({
                                path: '/login',
                                query: { redirect: router.currentRoute.path },
                            });
                            break;
                        // case 403:
                        // 403为权限不足,这时用户已经登录,不能返回登录页,如果后台在为登录时返回403就是后台错了
                        // router.replace({
                        //     path: '/login',
                        //     query: {redirect: router.currentRoute.path},
                        // });
                        // break;
                        default:
                            if (
                                error.response?.request?.responseURL?.includes('api/waterloo/check')
                                || error.response?.request?.responseURL?.includes('authox/curUser')
                            ) {
                                router.replace({
                                    path: '/login',
                                    query: { redirect: router.currentRoute.path },
                                });
                            }
                    }
                }
                return Promise.reject(error);
            },
        );
    router.beforeEach(async (to, from, next) => {
        const $userStore = useUserStore(pinia);
        // 登录或者meta中auth为false则直接进入页面
        if (to.name === 'login' || to.meta?.auth === false) {
            next();
        } else {
            try {
                // 这个是假的
                $userStore.setUserInfo(await checkAndGetUserInfo());
                next();
            } catch (e) {
                next(false);
                router.push({ name: 'login' });
            }
        }
    });
}
