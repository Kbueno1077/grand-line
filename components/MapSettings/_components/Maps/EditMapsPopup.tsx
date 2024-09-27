"use client";

import { useStoreContext } from "@/store/useStoreContext";
import {
    Box,
    Button,
    Flex,
    IconButton,
    Popover,
    Spinner,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { Settings2 } from "lucide-react";
import React, { useEffect } from "react";
import DeleteMap from "./DeleteMap";

function EditMapsPopup({ map }) {
    const [name, setName] = React.useState(map.name);
    const [description, setDescription] = React.useState(map.description);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const { changeMapName } = useStoreContext((s) => ({
        changeMapName: s.changeMapName,
    }));

    const handleUpdateMap = async () => {
        setIsLoading(true);
        try {
            await changeMapName({ ...map, name, description });
        } catch (error) {
            console.error("Error updating map:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isPopoverOpen) {
            setName(map.name);
            setDescription(map.description);
        }
    }, [isPopoverOpen]);

    return (
        <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <Popover.Trigger>
                <IconButton
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-pointer"
                    variant="soft"
                >
                    <Settings2 />
                </IconButton>
            </Popover.Trigger>
            <Popover.Content width="360px">
                <Flex gap="3">
                    <Box flexGrow="1">
                        <Flex gap="3" justify="between" align={"center"}>
                            <div className="w-full flex flex-col gap-2">
                                <TextField.Root
                                    className="w-full"
                                    placeholder="Name of the map"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <TextArea
                                    resize="vertical"
                                    placeholder="Description of the map"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </Flex>

                        <Flex gap="3" mt="3" justify="between">
                            <Flex align="center" gap="2" asChild>
                                <DeleteMap map={map} />
                            </Flex>

                            <Popover.Close>
                                <div>
                                    <Button
                                        className="cursor-pointer"
                                        size="1"
                                        onClick={handleUpdateMap}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Spinner /> : "Update Map"}
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

export default EditMapsPopup;
