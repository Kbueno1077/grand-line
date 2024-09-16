"use client";

import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "next-themes";

import { MapStore } from "@/store/zustand";
import React, { createContext } from "react";
import { StoreProvider } from "@/store/StoreProvider";
export const StoreContext = createContext<MapStore | null>(null);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class">
                <Theme accentColor="iris">{children}</Theme>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
