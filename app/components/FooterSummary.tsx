"use client";

import React from 'react';
import { WeeklySummary } from '../types';

interface FooterSummaryProps {
    summary: WeeklySummary;
}

export const FooterSummary: React.FC<FooterSummaryProps> = ({ summary }) => {
    return (
        <footer className='mt-5 border-t pt-4'>
            <h2 className="text-lg font-bold mb-2">Podsumowanie tygodnia:</h2>
            <p><span className="font-bold">Temperatura minimalna:</span> {summary.minTemperature.toFixed(1)}°C</p>
            <p><span className="font-bold">Temperatura maksymalna:</span> {summary.maxTemperature.toFixed(1)}°C</p>
            <p><span className="font-bold">Średnie ciśnienie:</span> {summary.avgPressure.toFixed(1)} hPa</p>
            <p><span className="font-bold">Średni czas nasłonecznienia:</span> {(summary.avgSunshineDuration / 3600).toFixed(2)} godzin</p>
            <p><span className="font-bold">Podsumowanie:</span> {summary.summary}</p>
        </footer>
    );
};
