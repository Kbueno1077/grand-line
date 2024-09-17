"use client";

import MapTypes from "@/components/MapSettings/MapTypes";
import { useStoreContext } from "@/store/useStoreContext";
import LocationSearch from "../LocationSearch/LocationSearch";
import AddedPins from "@/components/MapSettings/AddedPins";
import Favorites from "@/components/MapSettings/Favorites";
import MyMaps from "@/components/MapSettings/MyMaps";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MyMapsSmall from "@/components/MapSettings/MyMapsSmall";

function Sidebar() {
    const queryClient = useQueryClient();

    const { isSidebarOpen, loadMaps, user } = useStoreContext((s) => ({
        user: s.user,
        isSidebarOpen: s.isSidebarOpen,
        loadMaps: s.loadMaps,
    }));

    const fetchData = async () => {
        await loadMaps();
        return {};
    };

    // Queries
    const query = useQuery({
        queryKey: ["maps", user?.id],
        queryFn: () => fetchData(),
        refetchOnWindowFocus: false,
    });

    // Mutations
    const mutation = useMutation({
        mutationFn: fetchData,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: ["maps", user?.id],
            });
        },
    });

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
                    <div
                        className="flex flex-col gap-2 overflow-y-auto pb-4"
                        style={{
                            height: "calc(100dvh - 70px)",
                        }}
                    >
                        <LocationSearch />
                        <MyMaps />
                        <Favorites />
                        <AddedPins />
                        <MapTypes />
                    </div>
                )}

                {!isSidebarOpen && (
                    <div
                        className="hidden sm:block overflow-y-auto"
                        style={{
                            height: "calc(100dvh - 70px)",
                        }}
                    >
                        <MyMapsSmall />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
