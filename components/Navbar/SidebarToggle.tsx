"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { IconButton } from "@radix-ui/themes";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

function SidebarToggle() {
    const { isSidebarOpen, setIsSidebarOpen } = useStoreContext((s) => {
        return {
            isSidebarOpen: s.isSidebarOpen,
            setIsSidebarOpen: s.setIsSidebarOpen,
        };
    });

    return (
        <>
            <IconButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                variant="ghost"
                className="cursor-pointer"
            >
                {!isSidebarOpen ? <PanelRightClose /> : <PanelRightOpen />}
            </IconButton>
        </>
    );
}

export default SidebarToggle;
