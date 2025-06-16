"use client";

import { useState, useEffect, useCallback } from 'react';

interface Coordinates {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
}

export const useGeolocation = (): [Coordinates, () => void] => {
    const [coords, setCoords] = useState<Coordinates>({
        latitude: null,
        longitude: null,
        error: null,
    });

    const refreshLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setCoords((prev) => ({ ...prev, error: 'Geolokalizacja niedostępna' }));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            () => {
                setCoords((prev) => ({ ...prev, error: 'Brak zgody na geolokalizację' }));
            }
        );
    }, []);

    useEffect(() => {
        refreshLocation();
    }, [refreshLocation]);

    return [coords, refreshLocation];
};
