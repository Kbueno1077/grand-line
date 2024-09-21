import { createClient } from "@/utils/supabase/client";
import { Map, MapPoint, MapType } from "@/utils/types";
import { toast } from "react-toastify";

const supabase = createClient();

export const favoriteSlice = (set: Function, get: Function) => ({
    favorites: {
        Pins: [],
        Maps: [],
    },

    loadFavoritesByType: async (type: string, map: Map) => {
        try {
            get().setIsGlobalLoading(true);

            const { data, error } = await supabase
                .from("favorites")
                .select("*")
                .eq("map_id", map.id)
                .eq("type", type);

            if (error) throw error;

            if (!data) {
                throw new Error("No favorites data returned from the server");
            }

            const parsedFavorites = data
                .map((favorite) => {
                    try {
                        return {
                            ...JSON.parse(favorite.data),
                            id: favorite.id,
                        };
                    } catch (e) {
                        console.error("Error parsing favorite data:", e);
                        return null;
                    }
                })
                .filter(Boolean);

            set((state) => ({
                ...state,
                favorites: {
                    ...state.favorites,
                    [type]: parsedFavorites,
                },
            }));

            get().setIsGlobalLoading(false);
        } catch (error) {
            get().setIsGlobalLoading(false);
            console.error(`Error loading ${type} favorites:`, error);
            toast.error(`Failed to load ${type} favorites`);
            return error instanceof Error
                ? error
                : new Error(
                      `An unknown error occurred while loading ${type} favorites`
                  );
        }
    },

    addToFavorites: async (new_favorite: MapPoint | MapType, type: string) => {
        if (!get().favorites[type]) {
            set((state) => ({
                ...state,
                favorites: {
                    ...state.favorites,
                    [type]: [new_favorite],
                },
            }));
        }

        const map = get().mapSelected;
        console.log(map);
        if (map) {
            try {
                const { data, error } = await supabase
                    .from("favorites")
                    .insert({
                        map_id: map.id,
                        type: type,
                        data: JSON.stringify(new_favorite),
                    })
                    .select();

                console.log(data);

                if (error) {
                    throw error;
                }

                new_favorite.id = data[0].id;

                set((state) => ({
                    ...state,
                    favorites: {
                        ...state.favorites,
                        [type]: [...state.favorites[type], new_favorite],
                    },
                }));
                toast.success(`Added to ${type} favorites`);
            } catch (error) {
                console.error("Error adding favorite to Supabase:", error);
                toast.error(`Failed to add to ${type} favorites`);
            }
        }
    },
    removeFromFavorite: async (favorite: MapPoint | MapType, type: string) => {
        try {
            const { error } = await supabase.from("favorites").delete().match({
                id: favorite.id,
            });

            if (error) {
                throw error;
            }

            const newFavorites = get().favorites[type].filter(
                (item) => item.id !== favorite.id
            );

            set((state) => ({
                ...state,
                favorites: {
                    ...state.favorites,
                    [type]: newFavorites,
                },
            }));
            toast.success(`Removed from ${type} favorites`);
        } catch (error) {
            console.error("Error removing favorite from Supabase:", error);
            toast.error(`Failed to remove from ${type} favorites`);
        }
    },
});
