export const favoriteSlice = (set: Function, get: Function) => ({
    favorites: {
        Pins: [
            {
                display_name: "Love of my Life",
                osm_id: "1",
                lat: 22.409756,
                lon: -79.966421,
                useLoveIcon: true,
            },
        ],
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
