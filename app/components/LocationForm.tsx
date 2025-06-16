import React, { useState } from 'react';

export function LocationForm({ onSubmit }: { onSubmit: (lat: number, lon: number) => void }) {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        
        if (isNaN(latNum) || isNaN(lonNum)) {
            setError('Proszę podać poprawne liczby');
            return;
        }
        
        if (latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
            setError('Proszę podać prawidłowe współrzędne geograficzne');
            return;
        }

        setError('');
        onSubmit(latNum, lonNum);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <div className='my-5'>
                <label>
                    Szerokość geograficzna:
                    <input type="text" value={lat} onChange={e => setLat(e.target.value)} className="block
                        rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400" />
                </label>
            </div>

            <div className='my-5'>
                <label>
                    Długość geograficzna:
                    <input type="text" value={lon} onChange={e => setLon(e.target.value)} className="block
                        rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"/>
                </label>
            </div>
            

            <button type="submit" className="relative px-6 py-3 font-bold dark:text-white text-black bg-blue-500 dark:bg-blue-300 dark:hover:bg-blue-400 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:bg-blue-700 active:scale-95">Pobierz prognozę</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
