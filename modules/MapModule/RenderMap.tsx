"use client";
import L, { icon } from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { useStoreContext } from "@/store/useStoreContext";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import MinimapControl from "@/components/MapSettings/MiniMap/MiniMap";

function ChangeCenterView({ selectedPoint }: { selectedPoint: any }) {
    const map = useMap();

    useEffect(() => {
        if (selectedPoint) {
            map.setView(
                new L.LatLng(selectedPoint?.lat, selectedPoint?.lon),
                map.getZoom(),
                {
                    animate: true,
                }
            );
        }
    }, [selectedPoint?.pressTime]);

    return null;
}

function RenderMap() {
    const { mapType, non_save_mapPoints, pinToGetAt } = useStoreContext(
        (s) => ({
            mapType: s.mapType,
            non_save_mapPoints: s.non_save_mapPoints,
            pinToGetAt: s.pinToGetAt,
        })
    );

    const ICON = icon({
        iconUrl: "/heart.png",
        iconSize: [32, 32],
    });

    const defaultIcon = icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <div>
            <MapContainer
                center={[20, -40]}
                zoom={3}
                minZoom={3}
                scrollWheelZoom={true}
                style={{
                    height: "calc(100dvh - 63px)",
                }}
            >
                <TileLayer
                    attribution={mapType?.attribution || ""}
                    url={mapType?.url || ""}
                />

                {non_save_mapPoints.map((location) => {
                    const markerIcon = location.custom_marker
                        ? icon({
                              iconUrl: location.custom_marker,
                              iconSize: [32, 32],
                          })
                        : undefined;

                    return (
                        <Marker
                            key={location.id}
                            position={[location.lat, location.lon]}
                            icon={markerIcon ?? defaultIcon}
                        >
                            <Popup>
                                {location.tagName ?? ""} -{" "}
                                {location.display_name}
                            </Popup>
                        </Marker>
                    );
                })}

                <ChangeCenterView selectedPoint={pinToGetAt} />
                <MinimapControl position="topright" />
            </MapContainer>
        </div>
    );
}

export default RenderMap;
