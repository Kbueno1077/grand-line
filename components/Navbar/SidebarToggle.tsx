"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { IconButton } from "@radix-ui/themes";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { usePathname } from "next/navigation";

function SidebarToggle() {
    const pathname = usePathname();
    const { isSidebarOpen, setIsSidebarOpen } = useStoreContext((s) => {
        return {
            isSidebarOpen: s.isSidebarOpen,
            setIsSidebarOpen: s.setIsSidebarOpen,
        };
    });

    if (!pathname.includes("/maps")) return null;

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
