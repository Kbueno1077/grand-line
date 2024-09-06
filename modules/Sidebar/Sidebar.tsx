"use client";

import MapTypes from "@/components/MapSettings/MapTypes";
import { useStoreContext } from "@/store/useStoreContext";
import LocationSearch from "../LocationSearch/LocationSearch";
import AddedPins from "@/components/MapSettings/AddedPins";
import Favorites from "@/components/MapSettings/Favorites";

function Sidebar() {
    const { isSidebarOpen } = useStoreContext((s) => ({
        isSidebarOpen: s.isSidebarOpen,
    }));

    return (
        <div
            className={
                "absolute sm:relative bg-background sm:bg-transparent h-screen sm:h-max z-[1001]"
            }
        >
            <div
                className={`transition-all duration-250 ease-in-out z-50 ${
                    isSidebarOpen
                        ? "w-[320px] p-2 "
                        : "p-0 w-[0px] sm:p-2 sm:w-[65px]"
                }`}
            >
                {isSidebarOpen && (
                    <div className="flex flex-col gap-2">
                        <LocationSearch />
                        <Favorites />
                        <AddedPins />
                        <MapTypes />
                    </div>
                )}

                {!isSidebarOpen && (
                    <div className="hidden sm:block">
                        <p>Contracted</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
