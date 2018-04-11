import * as EventsCreator from "../core/eventsCreator";

export const addCity = (city) => EventsCreator.createCityAddedEvent(city);
export const removeCity = (city) => EventsCreator.createCityRemovedEvent(city);
export const loadCities = (cities) => EventsCreator.createCitiesLoadedEvent(cities);

export const loadWeather = (city) => EventsCreator.createWeatherLoadedEvent(city);