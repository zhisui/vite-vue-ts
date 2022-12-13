
import { defineStore } from 'pinia';

export type MapOverlay = {
    show: boolean,
    position: number[],
    component: string,
    info: any;

};
export type FlashPoint = {
    show: boolean,
    position: number[],
};
export const mapStore = defineStore('map', () => {
    const mapOverlay = ref<MapOverlay|null >(null);
    const flashPoint = ref<FlashPoint |null>(null);

    const setMapOverlay = (data: MapOverlay) => {
        mapOverlay.value = data;
    };
    const setFlashPoint = (data: FlashPoint) => {
        flashPoint.value = data;
    };
    return {
        mapOverlay: readonly(mapOverlay),
        flashPoint: readonly(flashPoint),
        setFlashPoint,
        setMapOverlay
    };
});
