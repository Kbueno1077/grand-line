"use client";

import { useStoreContext } from "@/store/useStoreContext";
import * as Accordion from "@radix-ui/react-accordion";
import { Flex } from "@radix-ui/themes";
import DroppedPinCard from "./Cards/DroppedPinCard";
import {
    AccordionContent,
    AccordionTrigger,
} from "./_components/AccordionComponents";
import { Pin } from "lucide-react";

const AddedPins = () => {
    const {
        non_save_mapPoints,
        favorites,
        getToMapPoint,
        addToFavorites,
        removeFromFavorite,
    } = useStoreContext((s) => ({
        non_save_mapPoints: s.non_save_mapPoints,
        favorites: s.favorites,
        addToFavorites: s.addToFavorites,
        removeFromFavorite: s.removeFromFavorite,
        getToMapPoint: s.getToMapPoint,
    }));

    const addFavorite = (e, mType) => {
        e.stopPropagation();
        addToFavorites(mType, "Pins");
    };

    const removeFavorite = (e, mType) => {
        e.stopPropagation();
        removeFromFavorite(mType, "Pins");
    };

    return (
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <Accordion.Item
                value="types"
                className="bg-muted rounded-sm overflow-auto"
            >
                <AccordionTrigger className=" rounded-sm">
                    <div className="flex gap-2 items-center">
                        <Pin size={20} strokeWidth={1} />
                        <h2 className="font-bold text-sm">Pins</h2>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2">
                    <Flex wrap={"wrap"} gap="1" className="pb-2 ">
                        {non_save_mapPoints.length === 0 && (
                            <h3 className="text-center w-full py-2">
                                No points to show
                            </h3>
                        )}

                        {non_save_mapPoints.map((pin, index) => {
                            return (
                                <DroppedPinCard
                                    key={pin.osm_id}
                                    location={pin}
                                    index={index}
                                    getToMapPoint={getToMapPoint}
                                    removeFromFavorites={removeFavorite}
                                    isStatic={false}
                                    addToFavorites={addFavorite}
                                    isFavorite={favorites["Pins"]?.find(
                                        (f) => f.osm_id === pin.osm_id
                                    )}
                                />
                            );
                        })}
                    </Flex>
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default AddedPins;
