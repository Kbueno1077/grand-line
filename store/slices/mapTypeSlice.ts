import { typesOfMaps } from "@/utils/utils";

export const createMapTypeSlice = (set: Function, get: Function) => ({
    mapType: typesOfMaps[0],

    changeMapType: (mapType) => {
        set((state) => ({
            ...state,
            mapType,
        }));
    },
});
