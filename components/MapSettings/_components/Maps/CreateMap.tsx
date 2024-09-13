import { useStoreContext } from "@/store/useStoreContext";
import {
    Box,
    Button,
    Flex,
    Popover,
    Spinner,
    TextArea,
    TextField,
    AlertDialog,
} from "@radix-ui/themes";
import { useState } from "react";

function CreateMap() {
    const { createMap } = useStoreContext((s) => ({
        createMap: s.createMap,
    }));

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateMap = async (e: any) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }
        setIsLoading(true);
        try {
            await createMap({ name, description });
            setName("");
            setDescription("");
        } catch (error) {
            console.error("Error creating map:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Popover.Root>
                <Popover.Trigger>
                    <Button className="w-full cursor-pointer">
                        Add a Map +
                    </Button>
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
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
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

                            <Flex className="flex justify-end pt-2">
                                <Popover.Close>
                                    <Button
                                        onClick={handleCreateMap}
                                        className="cursor-pointer"
                                        size="1"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Spinner /> : "Create map"}
                                    </Button>
                                </Popover.Close>
                            </Flex>
                        </Box>
                    </Flex>
                </Popover.Content>
            </Popover.Root>
        </>
    );
}

export default CreateMap;
