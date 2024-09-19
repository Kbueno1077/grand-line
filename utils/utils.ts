import { redirect } from "next/navigation";
/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
    type: "error" | "success",
    path: string,
    message: string
) {
    return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export const deepClone = <T>(originalObject: T): T => {
    return structuredClone(originalObject) as T;
};

export const typesOfMaps = [
    //MAP TILER

    {
        id: "basic",
        name: "Basic",
        url: "https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=9xD3QnX7lh5EgjhfLmMm",
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        img: "/maps/basic.png",
    },
    {
        id: "basic-dark",
        name: "Basic Dark",
        url: "https://api.maptiler.com/maps/basic-v2-dark/{z}/{x}/{y}.png?key=9xD3QnX7lh5EgjhfLmMm",
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        img: "/maps/basic-dark.png",
    },
    {
        id: "satellite",
        name: "Satellite",
        url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=9xD3QnX7lh5EgjhfLmMm",
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        img: "/maps/satellite.png",
    },

    {
        id: "streets",
        name: "Streets",
        url: "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=9xD3QnX7lh5EgjhfLmMm",
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        img: "/maps/streets.png",
    },

    //OPEN STREET MAP
    // {
    //     id: "osm",
    //     name: "OpenStreetMap",
    //     attribution:
    //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //     style: "default",
    //     note: "Free to use for any purpose",
    // },
    // // {
    // //     id: "stadiamaps",
    // //     name: "OpenStreetMap.Stadiamaps",
    // //     attribution:
    // //         '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // //     url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    // //     ext: "png",
    // // },
    // {
    //     id: "osm-de",
    //     name: "OpenStreetMap.DE",
    //     attribution:
    //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     url: "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
    //     ext: "png",
    // },
    // {
    //     id: "osm-ch",
    //     name: "OpenStreetMap.CH",
    //     attribution:
    //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     url: "https://tile.osm.ch/switzerland/{z}/{x}/{y}.png",
    //     ext: "png",
    // },
    // {
    //     name: "OpenStreetMap.France",
    //     attribution:
    //         '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

    //     url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    //     ext: "png",
    // },
    // {
    //     name: "OpenStreetMap.BZH",
    //     attribution:
    //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
    //     url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    //     ext: "png",
    // },
    // {
    //     name: "OpenStreetMap.HOT",
    //     attribution:
    //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
    //     url: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
    //     ext: "png",
    // },
];

const otherMaps = [
    //OPNV MAPS
    {
        name: "OPNVKarte",
        attribution:
            'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
        ext: "png",
    },
    {
        name: "OpenTopoMap",
        attribution:
            'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        ext: "png",
    },

    //STADIA
    {
        name: " Stadia.AlidadeSmooth",
        attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
        ext: "png",
    },
    {
        name: " Stadia.AlidadeSmoothDark",
        attribution:
            '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
        ext: "png",
    },

    {
        name: "Stadia.AlidadeSatellite",
        attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png",
        ext: "png",
    },

    //CARTO
    {
        name: "Carto Light",
        attribution: "© CARTO",
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        style: "light_all",
        note: "Free to use with attribution",
    },
    {
        name: "Carto Dark",
        attribution: "© CARTO",
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        style: "dark_all",
        note: "Free to use with attribution",
    },
    {
        name: "Carto Voyager",
        attribution: "© CARTO",
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        style: "rastertiles/voyager",
        note: "Free to use with attribution",
    },

    {
        name: "Esri World Street Map",
        attribution: "Powered by Esri",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        style: "World_Street_Map",
        note: "Free to use with attribution",
    },
    {
        name: "Esri World Imagery",
        attribution: "Powered by Esri",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        style: "World_Imagery",
        note: "Free to use with attribution",
    },
    {
        name: "Esri World Topo Map",
        attribution: "Powered by Esri",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        style: "World_Topo_Map",
        note: "Free to use with attribution",
    },

    {
        name: "OpenTopoMap",
        attribution:
            "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        style: "default",
        note: "Free to use with attribution",
    },
    {
        name: "Wikimedia Maps",
        attribution: "Wikimedia maps | Map data © OpenStreetMap contributors",
        url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",
        style: "default",
        note: "Free to use with attribution",
    },

    {
        name: "Stadia Alidade Smooth",
        attribution:
            "© Stadia Maps, © OpenMapTiles © OpenStreetMap contributors",
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
        style: "alidade_smooth",
        note: "Free plan available, requires API key for higher usage",
    },
    {
        name: "Stadia OSM Bright",
        attribution:
            "© Stadia Maps, © OpenMapTiles © OpenStreetMap contributors",
        url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
        style: "osm_bright",
        note: "Free plan available, requires API key for higher usage",
    },
    {
        name: "Stadia Outdoors",
        attribution:
            "© Stadia Maps, © OpenMapTiles © OpenStreetMap contributors",
        url: "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
        style: "outdoors",
        note: "Free plan available, requires API key for higher usage",
    },
];
