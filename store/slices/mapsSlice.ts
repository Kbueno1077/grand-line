import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const mapsSlice = (set: Function, get: Function) => ({
    maps: [],
    mapSelected: null,

    loadMaps: async (user) => {
        try {
            get().setIsLoading(true);

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

            get().setIsLoading(false);
        } catch (error: any) {
            console.error("Error loading maps", error);
            const errorMessage = error?.message
                ? error?.message
                : "An unexpected error occurred while loading your maps";

            // showToast(errorMessage, "error");
            get().setIsLoading(false);

            return error instanceof Error
                ? error
                : new Error("An unknown error occurred");
        }
    },

    selectMap: (map) => {
        set((state) => ({
            ...state,
            mapSelected: map,
        }));
    },

    createMap: async (map) => {
        try {
            const user = get().user;
            console.log(user);

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
        } catch (error) {
            console.error("Error creating map", error);
            throw error;
        }
    },
    deleteMap: async (map) => {
        try {
            const { data, error } = await supabase
                .from("maps")
                .delete()
                .eq("id", map.id);

            if (error) throw error;

            set((state) => ({
                ...state,
                maps: state.maps.filter((item) => item.osm_id !== map.osm_id),
            }));
        } catch (error) {
            console.error("Error deleting map", error);
            throw error;
        }
    },
    changeMapName: async (map) => {
        try {
            const { data, error } = await supabase
                .from("maps")
                .update({ name: map.name })
                .eq("id", map.id);

            if (error) throw error;

            set((state) => ({
                ...state,
                maps: state.maps.map((item) =>
                    item.osm_id === map.osm_id
                        ? { ...item, name: map.name }
                        : item
                ),
            }));
        } catch (error) {
            console.error("Error changing map name", error);
            throw error;
        }
    },
});
