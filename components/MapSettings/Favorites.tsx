"use client";

import { useStoreContext } from "@/store/useStoreContext";
import * as Accordion from "@radix-ui/react-accordion";
import { Flex } from "@radix-ui/themes";

import {
    AccordionContent,
    AccordionTrigger,
} from "./_components/AccordionComponents";
import { Star } from "lucide-react";
import MapTypeCard from "./Cards/MapTypeCard";
import DroppedPinCard from "./Cards/DroppedPinCard";

const Favorites = () => {
    const {
        favorites,
        mapType,
        changeMapType,
        getToMapPoint,
        addToFavorites,
        removeFromFavorite,
    } = useStoreContext((s) => ({
        favorites: s.favorites,
        mapType: s.mapType,
        getToMapPoint: s.getToMapPoint,
        removeFromFavorite: s.removeFromFavorite,
        addToFavorites: s.addToFavorites,
        changeMapType: s.changeMapType,
    }));

    const addFavorite = (e, mType) => {
        e.stopPropagation();
        addToFavorites(mType, "Maps");
    };

    const removeFavorite = (e, selected, type) => {
        e.stopPropagation();
        removeFromFavorite(selected, type);
    };

    return (
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <Accordion.Item
                value="types"
                className="bg-muted rounded-sm overflow-auto"
            >
                <AccordionTrigger className=" rounded-sm">
                    {" "}
                    <div className="flex gap-2 items-center">
                        <Star size={20} strokeWidth={1} />
                        <h2 className="font-bold text-sm">Favorites</h2>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-2">
                    {Object.keys(favorites).length === 0 && (
                        <h3 className="text-center w-full py-2">
                            No favorites added
                        </h3>
                    )}

                    <Flex wrap={"wrap"} gap="1" className="pb-2">
                        {favorites["Pins"] &&
                            favorites["Pins"].map((location) => {
                                return (
                                    <DroppedPinCard
                                        key={location.osm_id}
                                        location={location}
                                        addToFavorites={addFavorite}
                                        removeFromFavorites={(e, selected) =>
                                            removeFavorite(e, selected, "Pins")
                                        }
                                        isFavorite={true}
                                        isStatic={true}
                                        getToMapPoint={getToMapPoint}
                                    />
                                );
                            })}

                        {favorites["Maps"] &&
                            favorites["Maps"].map((mType) => {
                                return (
                                    <MapTypeCard
                                        key={mType.name}
                                        mapType={mType}
                                        handleChange={changeMapType}
                                        addToFavorites={addFavorite}
                                        removeFromFavorites={(e, selected) =>
                                            removeFavorite(e, selected, "Maps")
                                        }
                                        isFavorite={true}
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

export default Favorites;
