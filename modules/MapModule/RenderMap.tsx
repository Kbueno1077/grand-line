"use client";
import { icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useStoreContext } from "@/store/useStoreContext";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";

function RenderMap() {
    const { mapType } = useStoreContext((s) => ({
        mapType: s.mapType,
    }));

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
                    height: "100dvh",
                    width: "100vw",
                }}
            >
                <TileLayer
                    attribution={mapType?.attribution || ""}
                    url={mapType?.url || ""}
                />

                <Marker
                    position={[28.34732370882098, -81.41418625023127]}
                    // icon={ICON}
                >
                    <Popup>
                        Evan Home Care, 1101 Miranda Ln. Suite 127 Kissimmee, FL
                        34741
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default RenderMap;
