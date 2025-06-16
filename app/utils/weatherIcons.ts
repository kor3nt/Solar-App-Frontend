import { faSun, faCloudSun, faCloudRain, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

export const weatherCodeToIcon = (code: number) => {
    switch(code) {
        case 0:
            return faSun;
        case 3:
            return faCloudSun;
        case 51:
            return faCloudRain;
        case 63:
            return faCloudShowersHeavy;
        default:
            return faSun; 
    }
};

