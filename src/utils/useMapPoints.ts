
import { testApi } from '@/api';
import { coordinateTransform, olData, validCoords } from '@suc/gnet-monch';
import { require } from './require';
import ChangeCheckReturn from '@/types/common';
const mapPoints = reactive({
    polluteGas: {
        points: [],
        show: false,
    },
    polluteWater: {
        points: [],
        show: false,
    },
});

const mapArray = [
    {
        checkedNode: '废气',
        function: () => getGasPoints
    }
];
export const useMapPoints = (checkedNode: ChangeCheckReturn[] | ChangeCheckReturn) => {
    if (Array.isArray(checkedNode)) {
        initRenderPoints(checkedNode);
    } else {
        changeSingleCheck(checkedNode);
    }
    return {
        mapPoints
    };

};

const changeSingleCheck = async (checkedNode: ChangeCheckReturn) => {
    switch (checkedNode.title) {
        case '废气': {
            if (checkedNode.checked) {
                await getGasPoints();
                mapPoints.polluteGas.show = true;
            } else {
                mapPoints.polluteGas.show = false;
            }
        }
    }
};

const initRenderPoints = (initNodeArr: ChangeCheckReturn[]) => {
    for(let i =0; i<initNodeArr.length; i++) {
        console.log(initNodeArr[i].function,'initNodeArr[i].function')
        eval(initNodeArr[i].function)
    }
};
// 获取废气点位
const getGasPoints = async () => {
    const res = await testApi.getList();
    mapPoints.polluteGas.points = res.filter((e: any) => validCoords(e.jd, e.wd)).map((item: any) => {
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
};


