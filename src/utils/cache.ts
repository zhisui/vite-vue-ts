import { caching } from 'cache-manager';
import { nav } from '@/constant/nav';
export const memoryCache = await caching('memory', {
    max: 100,
    ttl: 10 * 1000 /*milliseconds*/,
});

export const getLayerNavObj = async () => {
    return await memoryCache.wrap('navMap', () => findIndex(nav, {}, []),1000);
};

//获取环保图层下标
export const findIndex = async (nav: any[], obj: any, arr = []) => {
    nav.map((e, index) => {
        obj[e.title] = [...arr, index];
        if (e.hasOwnProperty('children')) {
            findIndex(e.children, obj, obj[e.title]);
        }
    });
    return Promise.resolve(obj);
}


/**
 * 销毁
 */
export const clearCache =async () => {
    await memoryCache.del('navMap');
}
