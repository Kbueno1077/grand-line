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
        <div>
            <div
                className={`h-screen transition-all duration-250 ease-in-out z-50 p-2 ${
                    isSidebarOpen
                        ? "w-[320px]"
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
                    <>
                        <p>Contracted</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
