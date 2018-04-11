import { OPENWEATHERMAP_API_KEY } from '../core/constants';

export default class OpenWeatherService {
    getForecast(city) {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${OPENWEATHERMAP_API_KEY}`)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            });
    }

    isCityExists(city) {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${OPENWEATHERMAP_API_KEY}`)
            .then((response) => {
                return response.status == 200;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function getTodayTemp(response) {
    return Math.round(response['list'][0]['main']['temp']);
}

export function getTomorrowTemp(response) {
    return Math.round(response['list'][8]['main']['temp']);
}

export function getDescription(response) {
    const description = response['list'][0]['weather'][0]['description'];
    return description.charAt(0).toUpperCase() + description.slice(1);
}

export function getWeatherIconCode(response) {
    return response['list'][0]['weather'][0]['icon'];
}