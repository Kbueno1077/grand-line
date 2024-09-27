"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { Box, Button, Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { Settings2 } from "lucide-react";
import NameFieldUpdate from "./NameFieldUpdate";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const icons = [
    "/icons/heart.png",
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
];

function EditPinsPopup({ location }) {
    const [nameValue, setNameValue] = React.useState(
        location.tagName ?? location.display_name
    );
    const [customIcon, setCustomIcon] = React.useState(
        location.custom_marker || ""
    );
    const [isOpen, setIsOpen] = React.useState(false);

    const { removeMapPoint, updateMapPoint } = useStoreContext((s) => ({
        removeMapPoint: s.removeMapPoint,
        updateMapPoint: s.updateMapPoint,
    }));

    const handleChangeName = (e: any) => {
        setNameValue(e.target.value);
    };

    const handleUpdateName = async () => {
        try {
            await updateMapPoint(location.id, {
                displayName: nameValue,
                customIcon,
            });
        } catch (error) {
            console.error("Error updating pin name:", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setNameValue((location.tagName ?? location.display_name) || "");
            setCustomIcon(location.custom_marker || "");
        }
    }, [isOpen]);

    return (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
                <IconButton className="cursor-pointer" variant="soft">
                    <Settings2 />
                </IconButton>
            </Popover.Trigger>
            <Popover.Content width="360px">
                <Flex gap="3">
                    <Box flexGrow="1">
                        <NameFieldUpdate
                            handleChangeName={handleChangeName}
                            name={nameValue}
                        />

                        {location.tagName && (
                            <div className="mt-2 px-2 py-4 bg-muted rounded-sm">
                                <h2 className="text-sm font-bold">Location</h2>
                                <div>{location.display_name}</div>
                            </div>
                        )}
                        {/* Custom Icon Selection */}
                        <Flex
                            gap="2"
                            wrap="wrap"
                            overflowY="auto"
                            className="mt-2"
                        >
                            {icons.map((icon, index) => (
                                <Box
                                    key={index}
                                    className={`p-2 ${customIcon === icon ? "bg-primary hover:bg-primary text-white rounded-sm" : "bg-transparent hover:bg-gray-200 transition-all duration-300 ease-in-out border border-gray-300 cursor-pointer rounded-sm"}`}
                                    onClick={() => setCustomIcon(icon)}
                                >
                                    <Image
                                        src={icon}
                                        alt={`Icon ${index + 1}`}
                                        width={24}
                                        height={24}
                                        layout="fixed"
                                        objectFit="cover"
                                        style={{
                                            borderRadius: "0px", // Changed border-radius to make the icon square
                                        }}
                                    />
                                </Box>
                            ))}
                        </Flex>

                        <Flex gap="3" mt="3" justify="between">
                            <Flex align="center" gap="2" asChild>
                                <Text as="label" size="2">
                                    <Button
                                        size="1"
                                        color="red"
                                        className="cursor-pointer"
                                        onClick={() => removeMapPoint(location)}
                                    >
                                        Remove Pin
                                    </Button>
                                </Text>
                            </Flex>

                            <Popover.Close>
                                <div>
                                    <Button
                                        className="cursor-pointer"
                                        size="1"
                                        onClick={handleUpdateName}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </Popover.Close>
                        </Flex>
                    </Box>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    );
}

export default EditPinsPopup;
