"use client";

import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { createLayoutSlice } from "./slices/layoutSlice";
import { createMapSettingsSlice } from "./slices/mapSettingsSlice";
import { MapType } from "@/utils/types";

export interface StoreProps {
    isSidebarOpen: boolean;
    mapType: MapType;

    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
    changeMapType: (mapType: MapType) => void;
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
            }),
            {
                name: "save-maps-config",
                partialize: (state) => ({}),
            }
        )
    );
};
