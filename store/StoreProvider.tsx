import { StoreContext } from "@/app/providers";
import { useRef } from "react";
import { createMapsStore, type MapStore } from "./zustand";

export function StoreProvider({
    children,
    ...props
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<MapStore>();
    if (!storeRef.current) {
        storeRef.current = createMapsStore({});
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    );
}
