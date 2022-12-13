import request from '@/utils/http/request';
import {Welcome10} from './type'

// 有时间就建议写返回类型，没时间就别折腾了，感觉有点麻烦
export const testApi = (params:{time:String}) => {
    return request<Welcome10>({
        method: 'get',
        url: '/rest/air/getQHJJDJCWT',
        params: {
        ...params
        }
    });
};

export const getList = () => {
    return request<any>({
        method: 'get',
        url: 'tailing/getWkkQD',
    });
}
