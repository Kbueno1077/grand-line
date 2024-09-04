"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { typesOfMaps } from "@/utils/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { useThemeContext } from "@radix-ui/themes";
import MapTypeCard from "./MapTypeCard";

const MapTypes = () => {
    const { mapType, changeMapType } = useStoreContext((s) => {
        return {
            mapType: s.mapType,
            changeMapType: s.changeMapType,
        };
    });

    return (
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <Accordion.Item
                value="types"
                className="bg-muted rounded-sm overflow-auto"
            >
                <AccordionTrigger className=" rounded-sm">
                    <span className="font-bold text-sm">Types of Map</span>
                </AccordionTrigger>
                <AccordionContent className="px-2">
                    <Flex wrap={"wrap"} gap="1" className="cursor-pointer pb-2">
                        {typesOfMaps.map((mType) => {
                            return (
                                <MapTypeCard
                                    key={mType.name}
                                    mapType={mType}
                                    handleChange={changeMapType}
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

const AccordionTrigger = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className={classNames(
                    "cursor-pointer group flex h-[45px] flex-1  items-center justify-between px-2 leading-none  outline-none",
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon
                    className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden
                />
            </Accordion.Trigger>
        </Accordion.Header>
    )
);

const AccordionContent = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={classNames(
                "text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]",
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="">{children}</div>
        </Accordion.Content>
    )
);
