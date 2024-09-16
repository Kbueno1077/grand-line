import { createClient } from "@/utils/supabase/client";
import { Map } from "@/utils/types";

const supabase = createClient();

export const mapsSlice = (set: Function, get: Function) => ({
    maps: [],
    mapSelected: null,

    loadMaps: async () => {
        try {
            const user = get().user;

            get().setIsGlobalLoading(true);

            const { data, error } = await supabase
                .from("maps")
                .select("*")
                .eq("user_id", user.id);

            if (error) throw error;

            if (!data) {
                throw new Error("No Data returned from the server");
            }

            set((state) => ({
                ...state,
                maps: data,
            }));

            get().setIsGlobalLoading(false);
        } catch (error: any) {
            console.error("Error loading maps", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while loading your maps";

            get().setIsGlobalLoading(false);

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    selectMap: async (map: Map) => {
        try {
            get().setIsGlobalLoading(true);

            const { data, error } = await supabase
                .from("map_points")
                .select("*")
                .eq("map_id", map.id);

            if (error) throw error;

            if (!data) {
                throw new Error("No points data returned from the server");
            }

            const parsedMapPoints = data.map((point) => {
                try {
                    return JSON.parse(point.point_data);
                } catch (e) {
                    throw new Error("Error parsing map points");
                }
            });

            set((state) => ({
                ...state,
                non_save_mapPoints: parsedMapPoints,
                mapSelected: map,
            }));

            await Promise.all([
                get().loadFavoritesByType("Pins", map),
                get().loadFavoritesByType("Maps", map),
            ]);

            get().setIsGlobalLoading(false);
        } catch (error) {
            get().setIsGlobalLoading(false);

            console.error("Error loading map points", error);
        }
    },

    createMap: async (map: Map) => {
        try {
            const user = get().user;
            get().setIsGlobalLoading(true);

            const { data, error } = await supabase
                .from("maps")
                .insert([
                    {
                        name: map.name,
                        description: map.description,
                        user_id: user.id,
                    },
                ])
                .select()
                .single();

            if (error) throw error;

            if (!data) {
                throw new Error("No data returned after creating map");
            }

            set((state) => ({
                ...state,
                maps: [...state.maps, data],
            }));

            get().setIsGlobalLoading(false);
        } catch (error) {
            console.error("Error creating map", error);

            get().setIsGlobalLoading(false);
        }
    },
    deleteMap: async (map: Map) => {
        try {
            get().setIsGlobalLoading(true);

            const { data, error } = await supabase
                .from("maps")
                .delete()
                .eq("id", map.id);

            if (error) throw error;

            set((state) => ({
                ...state,
                maps: state.maps.filter((item) => item.id !== map.id),
            }));

            get().setIsGlobalLoading(false);
        } catch (error) {
            console.error("Error deleting map", error);

            get().setIsGlobalLoading(false);
        }
    },
    changeMapName: async (map: Map) => {
        try {
            get().setIsGlobalLoading(true);

            const { data, error } = await supabase
                .from("maps")
                .update({ name: map.name })
                .eq("id", map.id);

            if (error) throw error;

            set((state) => ({
                ...state,
                maps: state.maps.map((item) =>
                    item.id === map.id ? { ...item, name: map.name } : item
                ),
            }));

            get().setIsGlobalLoading(false);
        } catch (error) {
            get().setIsGlobalLoading(false);
            console.error("Error changing map name", error);
        }
    },
});
