import { AsyncStorage } from 'react-native'

import * as ReduxEvents from "../core/reduxEvents";
import StorageProvider from "../storage/StorageProvider";
import { STORAGE_NAME } from "../core/constants"

const initialState = {
  cities: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ReduxEvents.CITY_ADDED: {
      try {
        const storage = new StorageProvider();
        storage.add(STORAGE_NAME, action.city);

      } catch(error) {
        console.log("Error saving data");
      }

      return {
        ...state,
        cities: [...state.cities, action.city]
      }
    }
    
    case ReduxEvents.CITY_REMOVED: {
      const newCityList = state.cities.filter(city => city != action.city);
      
      try {
        const storage = new StorageProvider();
        storage.set(STORAGE_NAME, newCityList);

      } catch(error) {
        console.log("Error deleting data");
      }

      return {
        ...state,
        cities: newCityList
      }
    }

    case ReduxEvents.CITIES_LOADED: {
      return {
        ...state,
        cities: action.cities
      }
    }

    case ReduxEvents.WEATHER_LOADED: {
      const updatedCities = [].concat(state.cities);
      const indexToUpdate = updatedCities.findIndex((city) => city.name == action.city.name);

      updatedCities[indexToUpdate] = action.city;
      
      return {
        ...state,
        cities: updatedCities
      }
    }

    default: {
      return state
    }
  }
}
