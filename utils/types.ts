export type MapType = {
    id?: string;
    name: string;
    attribution: string;
    url: string;
    ext?: string;
    img?: string;
};

export type Map = {
    id: string;
    name: string;
    description?: string;
    user_id?: string;
    created_at?: string;
};

// Main response type
export interface NominatimResponse {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon?: string;
    address: NominatimAddress;
    extratags?: Record<string, string>;
}

// Address component type
export interface NominatimAddress {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
    [key: string]: string | undefined;
}

export type NominatimResponseArray = NominatimResponse[];

export interface MapPoint extends NominatimResponse {
    id: string;
    tagName?: string;
}
