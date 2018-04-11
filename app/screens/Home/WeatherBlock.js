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

    this.state = { city: this.props.city };
    this.openWeatherService = new OpenWeatherService();
  }

  componentDidMount() {
    this.openWeatherService.getForecast(this.state.city.name)
      .then((response) => {
        const updatedCity = Object.assign({}, this.state.city);
        updatedCity.todayTemp = getTodayTemp(response);
        updatedCity.tomorrowTemp = getTomorrowTemp(response);
        updatedCity.icon = getWeatherIconCode(response);
        updatedCity.description = getDescription(response);

        this.setState({ city: updatedCity });
      });
  }

  render() {
    const remoteIconPath = `http://openweathermap.org/img/w/${ this.state.city.icon }.png`;
    
    return (
        <View style={ [styles.weatherBlock] }>
            <View style={ [styles.descriptionBlock] }>
                <Text style={ [styles.titleText] }>
                  { this.state.city.name }
                </Text>

                <Text style={ [styles.descriptionText] }>
                  { this.state.city.description }
                </Text>
                
                <Text>Today: { this.state.city.todayTemp } &#8451;</Text>
                <Text>Tomorrow: { this.state.city.tomorrowTemp } &#8451;</Text>
            </View>
            <Image source={{uri: remoteIconPath}} style={ [styles.weatherIcon] } />
        </View>
    );
  }
}

export default WeatherBlock;
