"use client";

import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { createLayoutSlice } from "./slices/layoutSlice";
import { createMapSettingsSlice } from "./slices/mapSettingsSlice";
import { MapType } from "@/utils/types";
import { favoriteSlice } from "./slices/favoriteSlice";

export interface StoreProps {
    isSidebarOpen: boolean;
    mapType: MapType;
    non_save_mapPoints: any[];
    pinToGetAt: any;
    favorites: Object;

    addToFavorites: (new_favorite: any, type: string) => void;
    removeFromFavorite: (favorite: any, type: string) => void;

    getToMapPoint: (mapPoint: any) => void;
    addMapPoint: (mapPoint: any) => void;
    removeMapPoint: (mapPoint: any) => void;
    changeMapType: (mapType: MapType) => void;
    changeMapPointDisplayName: (name: string, index: number) => void;

    // LAYOUT
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
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
            }),
            {
                name: "save-maps-config",
                partialize: (state) => ({
                    non_save_mapPoints: state.non_save_mapPoints,
                }),
            }
        )
    );
};
