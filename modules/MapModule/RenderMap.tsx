"use client";
import L from "leaflet";
import { icon } from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { useStoreContext } from "@/store/useStoreContext";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

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
        iconUrl: "/location.png",
        iconSize: [32, 32],
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
                    width: "100vw",
                }}
            >
                <TileLayer
                    attribution={mapType?.attribution || ""}
                    url={mapType?.url || ""}
                />

                {/* <Marker
                    position={[28.34732370882098, -81.41418625023127]}
                    // icon={ICON}
                >
                    <Popup>
                        Evan Home Care, 1101 Miranda Ln. Suite 127 Kissimmee, FL
                        34741
                    </Popup>
                </Marker> */}

                {non_save_mapPoints.map((location) => {
                    return (
                        <Marker
                            position={[location.lat, location.lon]}
                            // icon={ICON}
                        >
                            <Popup>
                                {location.tagName ?? ""} -{" "}
                                {location.display_name}
                            </Popup>
                        </Marker>
                    );
                })}

                <ChangeCenterView selectedPoint={pinToGetAt} />
            </MapContainer>
        </div>
    );
}

export default RenderMap;
