export const createLayoutSlice = (set: Function, get: Function) => ({
    isSidebarOpen: true,
    isLoading: false,
    user: null,
    isGlobalLoading: false,

    setIsGlobalLoading: (isLoading: boolean) => {
        set({ isGlobalLoading: isLoading });
    },

    setUser: (user) => {
        set((state) => ({
            ...state,
            user,
        }));
    },

    setIsLoading: (isLoading: boolean) => {
        set((state) => ({
            ...state,
            isLoading,
        }));
    },

    setIsSidebarOpen: (isSidebarOpen: boolean) => {
        set((state) => ({
            ...state,
            isSidebarOpen,
        }));
    },
});
