"use client";
import { Skeleton } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// Skeleton loader component
const MapSkeleton = () => (
    <div className="h-screen w-full bg-gray-100 animate-pulse flex items-center justify-center p-5">
        <Skeleton className="h-full w-full rounded-lg " />
    </div>
);

function MapModule() {
    const RenderMap = useMemo(
        () =>
            dynamic(() => import("./RenderMap"), {
                loading: () => <MapSkeleton />,
                ssr: false,
            }),
        []
    );

    return (
        <div className="h-screen w-full">
            <RenderMap />
        </div>
    );
}

export default MapModule;
