"use client";

import React from 'react';
import { DailyForecast } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { weatherCodeToIcon } from '../utils/weatherIcons';

interface WeatherTableProps {
    dailyForecasts: DailyForecast[];
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');     
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    return `${day}/${month}/${year}`;
};

export const WeatherTable: React.FC<WeatherTableProps> = ({ dailyForecasts }) => {
    return (
        <div className="overflow-x-auto my-5">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 dark:bg-blue-300">
                        {dailyForecasts.map((day) => (
                            <th key={day.date} className="border border-gray-300 px-4 py-2 text-center">
                                {formatDate(day.date)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {dailyForecasts.map((day) => (
                            <td key={day.date} className="border border-gray-300 text-center p-2">
                                <FontAwesomeIcon icon={weatherCodeToIcon(day.weatherCode)} size="2x" />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {dailyForecasts.map((day) => (
                            <td key={day.date} className="border border-gray-300 text-center p-2">
                                Max: {typeof day.maxTemp === 'number' ? day.maxTemp.toFixed(1) : 'brak danych'}°C
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {dailyForecasts.map((day) => (
                            <td key={day.date} className="border border-gray-300 text-center p-2">
                                Min: {typeof day.minTemp === 'number' ? day.minTemp.toFixed(1) : 'brak danych'}°C
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {dailyForecasts.map((day) => (
                            <td key={day.date} className="border border-gray-300 text-center p-2">
                                Energia: {day.energyKwh.toFixed(2)} kWh
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
