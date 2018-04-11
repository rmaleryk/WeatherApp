import * as ReduxEvents from "./reduxEvents";

export const createCityAddedEvent = (city) => ({ type: ReduxEvents.CITY_ADDED, city });
export const createCityRemovedEvent = (city) => ({ type: ReduxEvents.CITY_REMOVED, city });
export const createCitiesLoadedEvent = (cities) => ({ type: ReduxEvents.CITIES_LOADED, cities });

export const createWeatherLoadedEvent = (city) => ({ type: ReduxEvents.WEATHER_LOADED, city });