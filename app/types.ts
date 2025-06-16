export interface DailyForecast {
    date: string; 
    maxTemp: number;
    minTemp: number;
    energyKwh: number;
    weatherCode: number;
}

export interface WeeklySummary {
    minTemperature: number;
    maxTemperature: number;
    avgPressure: number;
    avgSunshineDuration: number; 
    summary: string;
}