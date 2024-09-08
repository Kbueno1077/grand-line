"use client";

import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { createLayoutSlice } from "./slices/layoutSlice";
import { createMapSettingsSlice } from "./slices/mapSettingsSlice";
import { Map, MapType } from "@/utils/types";
import { favoriteSlice } from "./slices/favoriteSlice";
import { mapsSlice } from "./slices/mapsSlice";

export interface StoreProps {
    maps: Map[];
    mapSelected: Map;
    non_save_mapPoints: any[];

    pinToGetAt: any;
    mapType: MapType;

    favorites: Object;
    isSidebarOpen: boolean;
    isLoading: boolean;
    user: any;

    loadMaps: (user) => void;
    selectMap: (map: Map) => void;
    createMap: (map: Map) => void;
    deleteMap: (map: Map) => void;
    changeMapName: (map: Map) => void;

    addToFavorites: (new_favorite: any, type: string) => void;
    removeFromFavorite: (favorite: any, type: string) => void;

    getToMapPoint: (mapPoint: any) => void;
    addMapPoint: (mapPoint: any) => void;
    removeMapPoint: (mapPoint: any) => void;
    setUser: (user: any) => void;

    changeMapType: (mapType: MapType) => void;
    changeMapPointDisplayName: (name: string, index: number) => void;

    // LAYOUT
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
}
export type MapStore = ReturnType<typeof createMapsStore>;

type InitialProps = {};

export const createMapsStore = (initProps: InitialProps) => {
    return createStore<StoreProps>()(
        persist(
            (set, get) => ({
                ...initProps,

                //Slices
                ...createLayoutSlice(set, get),
                ...createMapSettingsSlice(set, get),
                ...favoriteSlice(set, get),
                ...mapsSlice(set, get),
            }),
            {
                name: "save-maps-config",
                partialize: (state) => ({
                    non_save_mapPoints: state.non_save_mapPoints,
                    favorites: state.favorites,
                }),
            }
        )
    );
};
