import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  FlatList
} from "react-native";

import SCREENS from "../../core/screen-const";
import { connect } from "../../core/reduxUtils";
import * as navigationActions from "../../actions/navigationActions";
import * as weatherAppActions from "../../actions/weatherAppActions";
import WeatherBlock from "./WeatherBlock";

const styles = StyleSheet.create({
  manageCitiesBtn: {
    marginBottom: 20
  },
  weathersBlock: {
    margin: 20
  },
  textCenter: {
    textAlign: "center"
  }
});

class HomeScreen extends PureComponent {
  static navigationOptions = {
    title: 'WeatherApp'
  }

  render() {
    const weatherList = (
      <FlatList
        data={ this.props.cities }
        renderItem={ ({ item }) => 
          <WeatherBlock 
            city={ item } 
            loadWeather={ this.props.loadWeather }
          /> 
        }
        keyExtractor={ (item, index) => index.toString() }
      />
    );

    return (
      <ScrollView>
      <View>
        <View style={ [styles.weathersBlock] }>
          {
            this.props.cities.length 
            ? weatherList
            : <Text style={ [styles.textCenter] }>No cities to display</Text> 
          }
        </View>
        <View style={ [styles.manageCitiesBtn] }>
          <Button
            onPress={ () => this.props.navigateTo(SCREENS.CITIES_LIST) }
            title="Manage cities"
            color="darkorange"
          />
        </View>
      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cities: state.weatherApp.cities,
  ...ownProps
});

const mapDispatchToProps = {
  loadWeather: weatherAppActions.loadWeather,
  navigateTo: navigationActions.navigateTo
};

export default connect(mapStateToProps, mapDispatchToProps, HomeScreen);
