import { typesOfMaps } from "@/utils/utils";

export const createMapSettingsSlice = (set: Function, get: Function) => ({
    mapType: typesOfMaps[0],
    non_save_mapPoints: [],
    pinToGetAt: null,

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
