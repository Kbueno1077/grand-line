"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { Box, Button, Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { Settings2 } from "lucide-react";
import NameFieldUpdate from "./NameFieldUpdate";
import React from "react";

function EditPinsPopup({ location, index }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [nameValue, setNameValue] = React.useState(
        location.tagName ?? location.display_name
    );

    const { removeMapPoint, changeMapPointDisplayName } = useStoreContext(
        (s) => ({
            removeMapPoint: s.removeMapPoint,
            changeMapPointDisplayName: s.changeMapPointDisplayName,
        })
    );

    const handleChangeName = (e: any) => {
        setNameValue(e.target.value);
    };

    const handleUpdateName = async () => {
        setIsLoading(true);
        try {
            await changeMapPointDisplayName(nameValue, index);
        } catch (error) {
            console.error("Error updating pin name:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Popover.Root>
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
                                        onClick={() =>
                                            changeMapPointDisplayName(
                                                nameValue,
                                                index
                                            )
                                        }
                                    >
                                        Change Name
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
