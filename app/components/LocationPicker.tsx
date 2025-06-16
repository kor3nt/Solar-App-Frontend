"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
});


type Props = {
    onLocationSelect: (lat: number, lon: number) => void;
    defaultCoords: { lat: number; lon: number } | null;
};

export default function LocationPicker({ onLocationSelect, defaultCoords }: Props) {
    useEffect(() => {
        if (!defaultCoords) return;

        const map = L.map("map").setView([defaultCoords.lat, defaultCoords.lon], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        let marker = L.marker([defaultCoords.lat, defaultCoords.lon]).addTo(map);

        map.on("click", (e: L.LeafletMouseEvent) => {
            const { lat, lng } = e.latlng;

            marker.setLatLng([lat, lng]); 
            onLocationSelect(lat, lng); 
        });

        return () => {
            map.remove();
        };
    }, [defaultCoords, onLocationSelect]);

    return <div id="map" className="h-96 w-full mt-6 rounded shadow-md" />;
}
