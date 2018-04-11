import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import { StackNavigator } from "react-navigation";

import SCREENS from "./core/screen-const";
import HomeScreen from "./screens/Home/HomeScreen";
import CitiesListScreen from "./screens/CitiesList/CitiesListScreen";

const AppNavigator = StackNavigator({
  [SCREENS.HOME]: {
    screen: HomeScreen
  },
  [SCREENS.CITIES_LIST]: {
    screen: CitiesListScreen
  },
});

export default AppNavigator;
