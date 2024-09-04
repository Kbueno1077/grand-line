export const createLayoutSlice = (set: Function, get: Function) => ({
    isSidebarOpen: true,

    setIsSidebarOpen: (isSidebarOpen: boolean) => {
        set((state) => ({
            ...state,
            isSidebarOpen,
        }));
    },
});
