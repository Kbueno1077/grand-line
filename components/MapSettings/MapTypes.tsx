"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { typesOfMaps } from "@/utils/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { Flex } from "@radix-ui/themes";
import { Map } from "lucide-react";
import MapTypeCard from "./Cards/MapTypeCard";
import {
    AccordionContent,
    AccordionTrigger,
} from "./_components/AccordionComponents";

const MapTypes = () => {
    const {
        mapType,
        favorites,
        changeMapType,
        addToFavorites,
        removeFromFavorite,
    } = useStoreContext((s) => {
        return {
            mapType: s.mapType,
            favorites: s.favorites,
            changeMapType: s.changeMapType,
            addToFavorites: s.addToFavorites,
            removeFromFavorite: s.removeFromFavorite,
        };
    });

    const addFavorite = (e, mType) => {
        e.stopPropagation();
        addToFavorites(mType, "Maps");
    };

    const removeFavorite = (e, mType) => {
        e.stopPropagation();
        removeFromFavorite(mType, "Maps");
    };

    return (
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <Accordion.Item
                value="types"
                className="bg-muted rounded-sm overflow-auto"
            >
                <AccordionTrigger className=" rounded-sm">
                    <div className="flex gap-2 items-center">
                        <Map size={20} strokeWidth={1} />
                        <span className="font-bold text-sm">Maps</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2">
                    <Flex wrap={"wrap"} gap="1" className="cursor-pointer pb-2">
                        {typesOfMaps.map((mType) => {
                            return (
                                <MapTypeCard
                                    key={mType.name}
                                    mapType={mType}
                                    handleChange={changeMapType}
                                    addToFavorites={addFavorite}
                                    removeFromFavorites={removeFavorite}
                                    isFavorite={favorites["Maps"]?.find(
                                        (f) => f.name === mType.name
                                    )}
                                    isSelected={mType.name === mapType.name}
                                />
                            );
                        })}
                    </Flex>
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default MapTypes;
