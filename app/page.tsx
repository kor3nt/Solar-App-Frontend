"use client";

import React, { useEffect, useState } from "react";
import { useGeolocation } from "./hooks/useGeolocation";
import { WeatherTable } from "./components/WeatherTable";
import { FooterSummary } from "./components/FooterSummary";
import { LocationForm } from "./components/LocationForm";
import { DailyForecast, WeeklySummary } from "./types";
import ThemeToggle from "./components/ThemeToggle";
import dynamic from "next/dynamic";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

// Kraków
const DEFAULT_COORDS = { lat: 50.0647, lon: 19.9450 };

const LocationPicker = dynamic(() => import("./components/LocationPicker"), {
  ssr: false,
  loading: () => <p>Ładowanie mapy...</p>,
});

export default function Home() {
  const [{ latitude, longitude, error: geoError }, refreshLocation] = useGeolocation();

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [isLocationSet, setIsLocationSet] = useState(false);

  useEffect(() => {
    if (!isLocationSet) {
      if (latitude !== null && longitude !== null) {
        setCoords({ lat: latitude, lon: longitude });
        setIsLocationSet(true);
      } else if (geoError) {
        setCoords(DEFAULT_COORDS);
        setIsLocationSet(true);
      }
    }
  }, [latitude, longitude, geoError, isLocationSet]);

  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[] | null>(null);
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const forecastRes = await fetch("https://solar-weather.onrender.com/api/weather/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
      });
      if (!forecastRes.ok) throw new Error(`Forecast API error: ${forecastRes.status}`);
      const forecastData = await forecastRes.json();

      const summaryRes = await fetch("https://solar-weather.onrender.com/api/weather/weekly-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
      });
      if (!summaryRes.ok) throw new Error(`Weekly summary API error: ${summaryRes.status}`);
      const summaryData = await summaryRes.json();

      setDailyForecasts(forecastData);
      setWeeklySummary(summaryData);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Nieznany błąd");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coords) {
      fetchData(coords.lat, coords.lon);
    }
  }, [coords]);

  const handleRestoreLocation = () => {
    refreshLocation();
    setIsLocationSet(false); 
  };

  return (
    <main className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded min-h-screen">
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
        Prognoza pogody na 7 dni
      </h1>
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center mb-6">
        Lokalizacja:{" "}
        {coords
          ? `${coords.lat.toFixed(4)}, ${coords.lon.toFixed(4)}`
          : "Brak danych o lokalizacji"}
      </h2>

      <LocationForm onSubmit={(lat, lon) => setCoords({ lat, lon })} />
      <button onClick={handleRestoreLocation} className="relative px-6 py-3 font-bold dark:text-white text-black bg-blue-500 dark:bg-blue-300 dark:hover:bg-blue-400 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:bg-blue-700 active:scale-95"><FontAwesomeIcon icon={faLocationArrow} /></button>

      {coords && (
        <LocationPicker
          defaultCoords={coords}
          onLocationSelect={(lat, lon) => setCoords({ lat, lon })}
        />
      )}

      {loading && <p className="text-center my-4">Ładowanie danych pogodowych...</p>}

      {error && <p className="text-center text-red-600 my-4">Błąd: {error}</p>}

      {dailyForecasts && <WeatherTable dailyForecasts={dailyForecasts} />}

      {weeklySummary && <FooterSummary summary={weeklySummary} />}
    </main>
  );
}
