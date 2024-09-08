"use client";

import MapTypes from "@/components/MapSettings/MapTypes";
import { useStoreContext } from "@/store/useStoreContext";
import LocationSearch from "../LocationSearch/LocationSearch";
import AddedPins from "@/components/MapSettings/AddedPins";
import Favorites from "@/components/MapSettings/Favorites";
import MyMaps from "@/components/MapSettings/MyMaps";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Sidebar({ user }: { user: User | null }) {
    const queryClient = useQueryClient();

    const { isSidebarOpen, loadMaps, setUser } = useStoreContext((s) => ({
        setUser: s.setUser,
        isSidebarOpen: s.isSidebarOpen,
        loadMaps: s.loadMaps,
    }));

    const fetchData = async (user: User | null) => {
        setUser(user || null);
        await loadMaps(user);
        return {};
    };

    // Queries
    const query = useQuery({
        queryKey: ["maps", user?.id],
        queryFn: () => fetchData(user),
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
                    <div className="flex flex-col gap-2">
                        <LocationSearch />
                        <MyMaps />
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
