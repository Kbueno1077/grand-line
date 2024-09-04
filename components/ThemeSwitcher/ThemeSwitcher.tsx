"use client";

import { DropdownMenu, Button, IconButton } from "@radix-ui/themes";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const ICON_SIZE = 16;

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <IconButton variant="ghost" className="cursor-pointer" size="3">
                    {theme === "light" ? (
                        <Sun
                            key="light"
                            size={20}
                            className={"text-muted-foreground"}
                        />
                    ) : theme === "dark" ? (
                        <Moon
                            key="dark"
                            size={20}
                            className={"text-muted-foreground"}
                        />
                    ) : (
                        <Laptop
                            key="system"
                            size={20}
                            className={"text-muted-foreground"}
                        />
                    )}
                </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-content" align="start">
                <DropdownMenu.RadioGroup
                    value={theme}
                    onValueChange={(e) => setTheme(e)}
                >
                    <DropdownMenu.RadioItem
                        className="flex gap-2 cursor-pointer"
                        value="light"
                    >
                        <Sun size={ICON_SIZE} className="" /> <span>Light</span>
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem
                        className="flex gap-2 cursor-pointer"
                        value="dark"
                    >
                        <Moon size={ICON_SIZE} className="" /> <span>Dark</span>
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem
                        className="flex gap-2 cursor-pointer"
                        value="system"
                    >
                        <Laptop size={ICON_SIZE} className=" " />{" "}
                        <span>System</span>
                    </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export { ThemeSwitcher };
