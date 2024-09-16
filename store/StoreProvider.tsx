"use client";

import { StoreContext } from "@/app/providers";
import { useRef } from "react";
import { createMapsStore, type MapStore } from "./zustand";

export function StoreProvider({
    children,
    user,
    ...props
}: {
    children: React.ReactNode;
    user: any;
}) {
    const storeRef = useRef<MapStore>();
    if (!storeRef.current) {
        storeRef.current = createMapsStore({ user });
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    );
}
