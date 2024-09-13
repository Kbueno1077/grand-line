import { deepClone } from "./../../utils/utils";
import { typesOfMaps } from "@/utils/utils";

export const createMapSettingsSlice = (set: Function, get: Function) => ({
    mapType: typesOfMaps[0],
    non_save_mapPoints: [],
    pinToGetAt: null,

    changeMapPointDisplayName: (name, index) => {
        console.log(name);
        const non_save_mapPoints = deepClone(get().non_save_mapPoints);
        non_save_mapPoints[index].tagName = name;

        set((state) => ({
            ...state,
            non_save_mapPoints,
        }));
    },

    getToMapPoint: (mapPoint) => {
        set((state) => ({
            ...state,
            pinToGetAt: {
                ...mapPoint,
                pressTime: Date.now(),
            },
        }));
    },

    addMapPoint: (mapPoint) => {
        const hasMapPoint = get().non_save_mapPoints.find(
            (item) => item.osm_id === mapPoint.osm_id
        );

        if (hasMapPoint) {
            set((state) => ({
                ...state,
                pinToGetAt: {
                    ...hasMapPoint,
                    pressTime: Date.now(),
                },
            }));
            return;
        }

        set((state) => ({
            ...state,
            pinToGetAt: { ...mapPoint, pressTime: Date.now() },
            non_save_mapPoints: [...state.non_save_mapPoints, mapPoint],
        }));
    },

    removeMapPoint: (mapPoint) => {
        set((state) => ({
            ...state,
            pinToGetAt: null,
            non_save_mapPoints: state.non_save_mapPoints.filter(
                (item) => item !== mapPoint
            ),
        }));
    },

    changeMapType: (mapType) => {
        set((state) => ({
            ...state,
            mapType,
        }));
    },
});
