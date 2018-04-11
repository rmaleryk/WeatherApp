import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image
} from "react-native";

import OpenWeatherService, { 
  getTodayTemp, 
  getTomorrowTemp, 
  getWeatherIconCode, 
  getDescription 
} from '../../services/OpenWeatherService';

const styles = StyleSheet.create({
  weatherBlock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#0000003A',
    marginBottom: 15
  },
  weatherIcon: {
    marginRight: 10,
    width: 50,
    height: 50
  },
  descriptionBlock: {
    flex: 0,
    flexDirection: 'column',
    margin: 10
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontStyle: 'italic' 
  }
});

class WeatherBlock extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.loadWeather = this.loadWeather.bind(this);

    this.openWeatherService = new OpenWeatherService();
  }

  loadWeather() {
    this.openWeatherService.getForecast(this.props.city.name)
    .then((response) => {
      const updatedCity = Object.assign({}, this.props.city);
      updatedCity.todayTemp = getTodayTemp(response);
      updatedCity.tomorrowTemp = getTomorrowTemp(response);
      updatedCity.icon = getWeatherIconCode(response);
      updatedCity.description = getDescription(response);

      this.props.loadWeather(updatedCity);
    });
  }

  componentDidMount() {
    this.loadWeather();
  }

  render() {
    const remoteIconPath = `http://openweathermap.org/img/w/${ this.props.city.icon }.png`;

    return (
        <View style={ [styles.weatherBlock] }>
            <View style={ [styles.descriptionBlock] }>
                <Text style={ [styles.titleText] }>
                  { this.props.city.name }
                </Text>

                <Text style={ [styles.descriptionText] }>
                  { this.props.city.description }
                </Text>
                
                <Text>Today: { this.props.city.todayTemp } &#8451;</Text>
                <Text>Tomorrow: { this.props.city.tomorrowTemp } &#8451;</Text>
            </View>
            <Image source={{uri: remoteIconPath}} style={ [styles.weatherIcon] } />
        </View>
    );
  }
}

export default WeatherBlock;
