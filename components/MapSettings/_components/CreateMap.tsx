import {
    Avatar,
    Box,
    Button,
    Flex,
    Popover,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import React from "react";

function CreateMap() {
    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button className="w-full cursor-pointer">Add a Map +</Button>
            </Popover.Trigger>
            <Popover.Content width="360px">
                <Flex gap="3">
                    <Box flexGrow="1">
                        <Flex gap="3" justify="between" align={"center"}>
                            <div className="w-full flex flex-col gap-2">
                                <TextField.Root
                                    className="w-full"
                                    placeholder="Name of the map"
                                ></TextField.Root>

                                <TextArea
                                    resize="vertical"
                                    placeholder="Description of the map"
                                ></TextArea>
                            </div>
                        </Flex>

                        <Flex className="flex justify-end pt-2">
                            <Popover.Close>
                                <Button className="cursor-pointer" size="1">
                                    Create map
                                </Button>
                            </Popover.Close>
                        </Flex>
                    </Box>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    );
}

export default CreateMap;
