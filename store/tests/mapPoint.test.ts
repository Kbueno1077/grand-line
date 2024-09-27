import { createClient } from "@/utils/supabase/client";
import { describe, beforeEach, expect, it, vi } from "vitest";
import { createMapsStore } from "../zustand";

// Mock Supabase client
vi.mock("@/utils/supabase/client", () => ({
    createClient: vi.fn(() => ({
        from: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi
            .fn()
            .mockResolvedValue({ data: [{ id: "idGen" }], error: null }),
    })),
}));

describe("createPointSlice", () => {
    let store;

    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks();
        // Create a new store instance for each test
        store = createMapsStore({ user: "test" });
    });

    it("should change map point display name", async () => {
        // Set initial state
        store.setState({
            non_save_mapPoints: [{ id: "idGen", tagName: "Old Name" }],
            mapSelected: { id: "idGen" },
            setIsGlobalLoading: vi.fn(),
        });

        // Update the test to call updateMapPoint instead
        await store
            .getState()
            .updateMapPoint("idGen", { displayName: "New Name" });

        expect(store.getState().non_save_mapPoints[0]).toEqual(
            expect.objectContaining({ id: "idGen", tagName: "New Name" })
        );
    });

    it("should add a map point", async () => {
        // Set initial state
        store.setState({
            user: { id: "idGen" },
            mapSelected: { id: "idGen" },
            non_save_mapPoints: [],
            setIsGlobalLoading: vi.fn(),
        });

        await store.getState().addMapPoint({ id: "idGen" }); // Ensure the id matches

        expect(store.getState().non_save_mapPoints).toContainEqual(
            expect.objectContaining({ id: "idGen" })
        );
    });

    it("should remove a map point", async () => {
        // Set initial state
        store.setState({
            mapSelected: { id: "idGen" },
            non_save_mapPoints: [{ id: "idGen" }],
            setIsGlobalLoading: vi.fn(),
        });

        await store.getState().removeMapPoint({ id: "idGen" });

        expect(store.getState().non_save_mapPoints).toHaveLength(0);
    });
});
