import { describe, it, expect, beforeEach, vi } from "vitest"; // Importing from vitest
import { typesOfMaps } from "@/utils/utils";
import { createMapsStore } from "../zustand";

describe("mapTypeSlice", () => {
    let store;

    beforeEach(() => {
        store = createMapsStore({ user: "test" });
    });

    it("should initialize with the first map type", () => {
        expect(store.getState().mapType).toEqual(typesOfMaps[0]);
    });

    it("should change the map type", async () => {
        const newMapType = typesOfMaps[1];
        store.getState().changeMapType(newMapType);
        expect(store.getState().mapType).toEqual(newMapType);
    });
});
