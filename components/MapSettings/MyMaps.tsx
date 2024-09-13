"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Flex } from "@radix-ui/themes";

import { useStoreContext } from "@/store/useStoreContext";
import { Earth } from "lucide-react";
import {
    AccordionContent,
    AccordionTrigger,
} from "./_components/AccordionComponents";
import CreateMap from "./_components/Maps/CreateMap";
import MapsCard from "./Cards/MapsCard";

const MyMaps = () => {
    const { maps, mapSelected, selectMap } = useStoreContext((s) => {
        return {
            maps: s.maps,
            createMap: s.createMap,
            mapSelected: s.mapSelected,
            selectMap: s.selectMap,
        };
    });
    console.log(maps);

    return (
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <Accordion.Item
                value="types"
                className="bg-muted rounded-sm overflow-auto"
            >
                <AccordionTrigger className=" rounded-sm">
                    <div className="flex gap-2 items-center">
                        <Earth size={20} strokeWidth={1} />
                        <h2 className="font-bold text-sm">My Maps</h2>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="px-2">
                    <Flex wrap={"wrap"} gap="1" className="py-2">
                        {maps.map((map) => {
                            return (
                                <MapsCard
                                    key={map.id}
                                    map={map}
                                    isSelected={map.id === mapSelected?.id}
                                    selectMap={selectMap}
                                />
                            );
                        })}

                        <div className="mt-2 w-full">
                            <CreateMap />
                        </div>
                    </Flex>
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default MyMaps;
