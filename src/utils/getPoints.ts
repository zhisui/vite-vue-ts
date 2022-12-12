import { testApi } from '@/api';
import { coordinateTransform, olData, validCoords } from '@suc/gnet-monch';
import { require } from './require';
// 获取废气点位
export const getGasPoints = async () => {
    const res = await testApi.getList()
    const data = res.filter((e: any) => validCoords(e.jd, e.wd)).map((item: any) => {
        return {
            id: item.id,
            lon: item.jd,
            lat: item.wd,
            info: {
                name: item.mc,
                type: '尾矿库',
                ...item,
                popComponent: 'TailingMap',
            },
            style: {
                image: {
                    icon: {
                        scale: 1,
                        anchor: [0.5, 0.9],
                        src: require('@/assets/mapPoints/尾矿库点位.png'),
                    },
                },
            },
        };
    });
    return data
};
