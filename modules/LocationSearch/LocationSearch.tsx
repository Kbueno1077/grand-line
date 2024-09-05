"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useStoreContext } from "@/store/useStoreContext";
import { Spinner, TextField } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MapPin, Search } from "lucide-react";
import React from "react";

const NOMINATIN_BASE_URL = "   https://nominatim.openstreetmap.org/search?";
const DEBOUNCE_DELAY = 500;

function LocationSearch() {
    const [searchValue, setSearchValue] = React.useState("");
    const debouncedSearchValue = useDebounce(searchValue, DEBOUNCE_DELAY);
    const [locationData, setLocationData] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const queryClient = useQueryClient();

    const { addMapPoint } = useStoreContext((s) => ({
        addMapPoint: s.addMapPoint,
    }));

    const handleChange = (e: any) => {
        setIsLoading(true);
        setSearchValue(e.target.value);
    };

    const handleSearch = async () => {
        setIsLoading(true);

        if (!debouncedSearchValue.trim()) {
            setLocationData([]);
            setIsLoading(false);
            return;
        }

        const params: any = {
            q: debouncedSearchValue,
            format: "json",
            addressdetails: 1,
            limit: 10,
            polygon_geojson: 0,
        };

        const queryString = new URLSearchParams(params).toString();
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const data = await (
            await fetch(`${NOMINATIN_BASE_URL}${queryString}`, requestOptions)
        ).json();

        setLocationData(data);
        setIsLoading(false);
    };

    const query = useQuery({
        queryKey: [debouncedSearchValue || ""],
        queryFn: () => handleSearch(),
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        mutationFn: handleSearch,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: [debouncedSearchValue || ""],
            });
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <TextField.Root
                placeholder="Search the docs…"
                value={searchValue}
                onChange={handleChange}
            >
                <TextField.Slot>
                    {isLoading ? <Spinner /> : <Search size={20} />}
                </TextField.Slot>
            </TextField.Root>

            {locationData.length > 0 && (
                <div className="bg-muted p-2 rounded-md">
                    <div className="flex flex-col gap-1">
                        {locationData.map((item) => {
                            return (
                                <div
                                    onClick={() => {
                                        addMapPoint(item);
                                    }}
                                    key={item?.osm_id}
                                    className="flex gap-2 items-center hover:bg-primary/30 p-2 rounded-md cursor-pointer"
                                >
                                    <MapPin
                                        size={20}
                                        className="text-primary"
                                    />
                                    <span>{item?.display_name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default LocationSearch;
