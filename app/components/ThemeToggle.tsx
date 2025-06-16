import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (stored) {
            setTheme(stored);
            document.documentElement.classList.toggle('dark', stored === 'dark');
        } else {
            const defaultTheme = prefersDark ? 'dark' : 'light';
            setTheme(defaultTheme);
            document.documentElement.classList.toggle('dark', defaultTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <button
        onClick={toggleTheme}
        className="p-2 rounded bg-gray-300 dark:bg-gray-800 text-black dark:text-white"
        >
        {theme === 'light' ? '🌙 ' : '☀️ '}
        <span className='hidden md:inline'>{theme === 'light' ? 'Ciemny' : 'Jasny'}</span>
        </button>
    );
};

export default ThemeToggle;
