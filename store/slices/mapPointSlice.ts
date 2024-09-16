import { deepClone } from "../../utils/utils";
import { typesOfMaps } from "@/utils/utils";

import { createClient } from "@/utils/supabase/client";
import { MapPoint } from "@/utils/types";

const supabase = createClient();

export const createPointSlice = (set: Function, get: Function) => ({
    mapType: typesOfMaps[0],
    non_save_mapPoints: [],
    pinToGetAt: null,

    changeMapPointDisplayName: async (name: string, index: number) => {
        try {
            const non_save_mapPoints = deepClone(get().non_save_mapPoints);
            non_save_mapPoints[index].tagName = name;

            // Update the point_data in the database
            const mapSelected = get().mapSelected;
            if (mapSelected) {
                get().setIsGlobalLoading(true);
                const { error } = await supabase
                    .from("map_points")
                    .update({
                        point_data: JSON.stringify(non_save_mapPoints[index]),
                    })
                    .eq("map_id", mapSelected.id)
                    .eq("id", non_save_mapPoints[index].id);

                if (error) throw error;

                set((state) => ({
                    ...state,
                    non_save_mapPoints,
                }));
                get().setIsGlobalLoading(false);
            }
        } catch (error) {
            console.error("Error updating map point:", error);
            get().setIsGlobalLoading(false);
        }
    },

    getToMapPoint: (mapPoint: MapPoint) => {
        set((state) => ({
            ...state,
            pinToGetAt: {
                ...mapPoint,
                pressTime: Date.now(),
            },
        }));
    },

    addMapPoint: async (mapPoint: MapPoint) => {
        const user = get().user;
        const mapSelected = get().mapSelected;

        if (!user || !mapSelected) {
            console.error("User or selected map not found");
            return;
        }

        const hasMapPoint = get().non_save_mapPoints.find(
            (item) => item.osm_id === mapPoint.osm_id
        );

        if (hasMapPoint) {
            set((state) => ({
                ...state,
                pinToGetAt: {
                    ...hasMapPoint,
                    pressTime: Date.now(),
                },
            }));
            return;
        }

        try {
            get().setIsGlobalLoading(true);

            const { data, error } = await supabase
                .from("map_points")
                .insert([
                    {
                        point_data: JSON.stringify(mapPoint),
                        map_id: mapSelected.id,
                    },
                ])
                .select();

            if (error) throw error;

            if (!data || data.length === 0) {
                throw new Error("No data returned after adding map point");
            }

            console.log("Map point added successfully:", data[0]);

            mapPoint.id = data[0].id;

            set((state) => ({
                ...state,
                pinToGetAt: { ...mapPoint, pressTime: Date.now() },
                non_save_mapPoints: [...state.non_save_mapPoints, mapPoint],
            }));

            get().setIsGlobalLoading(false);
        } catch (error) {
            console.error("Error adding map point to Supabase:", error);
            get().setIsGlobalLoading(false);
            return;
        }
    },

    removeMapPoint: async (mapPoint: MapPoint) => {
        const mapSelected = get().mapSelected;
        if (!mapSelected) {
            console.error("No map selected");
            return;
        }

        try {
            get().setIsGlobalLoading(true);
            const { error } = await supabase
                .from("map_points")
                .delete()
                .eq("id", mapPoint.id)
                .eq("map_id", mapSelected.id);

            if (error) throw error;

            set((state) => ({
                ...state,
                pinToGetAt: null,
                non_save_mapPoints: state.non_save_mapPoints.filter(
                    (item) => item !== mapPoint
                ),
            }));
            get().setIsGlobalLoading(false);
        } catch (error) {
            console.error("Error removing map point from Supabase:", error);
            get().setIsGlobalLoading(false);
        }
    },
});
