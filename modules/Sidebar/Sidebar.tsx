"use client";

import MapTypes from "@/components/MapSettings/MapTypes";
import { useStoreContext } from "@/store/useStoreContext";

function Sidebar() {
    const { isSidebarOpen } = useStoreContext((s) => ({
        isSidebarOpen: s.isSidebarOpen,
    }));

    return (
        <div>
            <div
                className={`h-screen transition-all duration-250 ease-in-out  z-50 p-2 ${
                    isSidebarOpen ? "w-[270px]" : "w-[75px]"
                }`}
            >
                {isSidebarOpen && (
                    <>
                        <MapTypes />
                    </>
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
