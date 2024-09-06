"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { useStoreContext } from "@/store/useStoreContext";
import { deepClone } from "@/utils/utils";
import { TextArea, TextField } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const DEBOUNCE_DELAY = 500;

function NameFieldUpdate({ name, index }) {
    const [nameValue, setNameValue] = React.useState(name);
    const debouncedSearchValue = useDebounce(nameValue, DEBOUNCE_DELAY);
    const queryClient = useQueryClient();

    const { changeMapPointDisplayName } = useStoreContext((s) => ({
        changeMapPointDisplayName: s.changeMapPointDisplayName,
    }));

    const handleChange = (e: any) => {
        setNameValue(e.target.value);
    };

    const changeName = async () => {
        if (debouncedSearchValue.trim() === "") {
            return;
        }

        changeMapPointDisplayName(debouncedSearchValue, index);
    };

    const query = useQuery({
        queryKey: [debouncedSearchValue || ""],
        queryFn: () => changeName(),
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        mutationFn: changeName,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: [debouncedSearchValue || ""],
            });
        },
    });

    const countFixedRows = (value: string) => {
        const chars = value.length;

        return Math.round(chars / 20);
    };

    const fixedRows = countFixedRows(nameValue);

    return (
        <div className="w-full mr-2.5">
            <TextArea
                resize="vertical"
                placeholder="Name of the pin"
                value={nameValue}
                onChange={handleChange}
                variant="soft"
                className="bg-muted m-0 p-0"
                autoFocus
                rows={fixedRows}
            ></TextArea>
        </div>
    );
}

export default NameFieldUpdate;
