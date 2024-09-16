import { useStoreContext } from "@/store/useStoreContext";
import {
    AlertDialog,
    Button,
    Flex,
    IconButton,
    Spinner,
} from "@radix-ui/themes";
import { CircleX } from "lucide-react";
import React from "react";

function DeleteMap({ map }: { map: any }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { deleteMap } = useStoreContext((s) => ({
        deleteMap: s.deleteMap,
    }));

    const handleDeleteMap = async () => {
        setIsLoading(true);
        try {
            await deleteMap(map);
        } catch (error) {
            console.error("Error deleting map:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button size="1" color="red" className="cursor-pointer">
                    Remove Map
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>Remove Map</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure you want to delete this map? This action cannot
                    be undone.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button
                            className="cursor-pointer"
                            variant="soft"
                            color="gray"
                        >
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button
                            className="cursor-pointer"
                            variant="solid"
                            color="red"
                            onClick={handleDeleteMap}
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner /> : "Delete Map"}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default DeleteMap;
