"use client";
import { TextArea } from "@radix-ui/themes";

function NameFieldUpdate({ name, handleChangeName }) {
    const countFixedRows = (value: string) => {
        const chars = value.length;

        return Math.round(chars / 20);
    };

    const fixedRows = countFixedRows(name || "");

    return (
        <div className="w-full mr-2.5">
            <TextArea
                resize="vertical"
                placeholder="Name of the pin"
                value={name}
                onChange={handleChangeName}
                variant="soft"
                className="bg-muted m-0 p-0"
                rows={fixedRows}
            ></TextArea>
        </div>
    );
}

export default NameFieldUpdate;
