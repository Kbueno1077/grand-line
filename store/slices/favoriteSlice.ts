export const favoriteSlice = (set: Function, get: Function) => ({
    favorites: {
        Pins: [],
    },

    addToFavorites: (new_favorite, type) => {
        if (!get().favorites[type]) {
            set((state) => ({
                ...state,
                favorites: {
                    ...state.favorites,
                    [type]: [new_favorite],
                },
            }));

            return;
        }

        set((state) => ({
            ...state,
            favorites: {
                ...state.favorites,
                [type]: [...state.favorites[type], new_favorite],
            },
        }));
    },
    removeFromFavorite: (favorite, type) => {
        const newFavorites = get().favorites[type].filter(
            (item) => item.osm_id !== favorite.osm_id
        );

        set((state) => ({
            ...state,
            favorites: {
                ...state.favorites,
                [type]: newFavorites,
            },
        }));
    },
});
