// 控制地图点位类型
export interface PointsType {
    points: any[];
    show: boolean;
}

// 图层选中的单个结点类型
export default interface NodeReturn {
    checked: boolean;
    indeterminate: boolean;
    nodeKey: number;
    title: string;
    function:string;
}
