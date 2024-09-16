"use client";

import { Map, MapPoint, MapType } from "@/utils/types";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { favoriteSlice } from "./slices/favoriteSlice";
import { createLayoutSlice } from "./slices/layoutSlice";
import { createPointSlice } from "./slices/mapPointSlice";
import { mapsSlice } from "./slices/mapsSlice";
import { createMapTypeSlice } from "./slices/mapTypeSlice";

export interface StoreProps {
    maps: Map[];
    mapSelected: Map;
    non_save_mapPoints: any[];

    pinToGetAt: any;
    mapType: MapType;

    favorites: Object;
    isSidebarOpen: boolean;
    isLoading: boolean;
    isGlobalLoading: boolean;
    user: any;

    loadMaps: () => void;
    selectMap: (map: Map) => void;
    createMap: (map: Map) => void;
    deleteMap: (map: Map) => void;
    changeMapName: (map: Map) => void;

    loadFavoritesByType: (type: string, map: Map) => void;
    addToFavorites: (new_favorite: MapPoint | MapType, type: string) => void;
    removeFromFavorite: (favorite: any, type: string) => void;

    getToMapPoint: (mapPoint: MapPoint) => void;
    addMapPoint: (mapPoint: MapPoint) => void;
    removeMapPoint: (mapPoint: MapPoint) => void;
    setUser: (user: any) => void;

    changeMapType: (mapType: MapType) => void;
    changeMapPointDisplayName: (name: string, index: number) => void;

    // LAYOUT
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsGlobalLoading: (isLoading: boolean) => void;
}
export type MapStore = ReturnType<typeof createMapsStore>;

type InitialProps = {
    user: any;
};

export const createMapsStore = (initProps: InitialProps) => {
    return createStore<StoreProps>()(
        persist(
            (set, get) => ({
                ...initProps,

                //Slices
                ...createLayoutSlice(set, get),
                ...createPointSlice(set, get),
                ...createMapTypeSlice(set, get),
                ...favoriteSlice(set, get),
                ...mapsSlice(set, get),
            }),
            {
                name: "save-maps-config",
                partialize: (state) => ({
                    favorites: state.favorites,
                    mapType: state.mapType,
                }),
            }
        )
    );
};
