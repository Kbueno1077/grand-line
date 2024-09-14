"use client";

import { useStoreContext } from "@/store/useStoreContext";
import { Spinner } from "@radix-ui/themes";
import React from "react";

function GlobalLoader() {
    const { isGlobalLoading } = useStoreContext((s) => {
        return {
            isGlobalLoading: s.isGlobalLoading,
        };
    });

    return <div>{isGlobalLoading && <Spinner />}</div>;
}

export default GlobalLoader;
