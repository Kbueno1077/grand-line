"use client";

import { useStoreContext } from "@/store/useStoreContext";
import MapsCardSmall from "./Cards/MapsCardSmall";

const MyMapsSmall = () => {
    const { maps, mapSelected, selectMap } = useStoreContext((s) => {
        return {
            maps: s.maps,
            createMap: s.createMap,
            mapSelected: s.mapSelected,
            selectMap: s.selectMap,
        };
    });

    return (
        <div className="flex flex-col gap-2">
            {maps.map((map) => {
                return (
                    <MapsCardSmall
                        key={map.id}
                        map={map}
                        isSelected={map.id === mapSelected?.id}
                        selectMap={selectMap}
                    />
                );
            })}
        </div>
    );
};

export default MyMapsSmall;
