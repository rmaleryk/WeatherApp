import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";

import CitiesListItem from "./CitiesListItem";
import CitiesListHeader from "./CitiesListHeader";

const styles = StyleSheet.create({
  list: {
    flex: 0,
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  textCenter: {
    textAlign: "center"
  }
});

class CitiesList extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.isDuplicateCity = this.isDuplicateCity.bind(this);
  }

  isDuplicateCity(cityName) {
    const duplicateCities = this.props.cities
      .filter(city => 
        city.name.replace(' ', '').toLowerCase() 
          == cityName.replace(' ', '').toLowerCase()
      );

    return duplicateCities.length != 0;
  }

  render() {
    const cities = this.props.cities && this.props.cities.length && this.props.cities.map((city, index) => {
      return (
          <CitiesListItem 
            key={ index } 
            city={ city } 
            removeCity={ this.props.removeCity }
          />
      );
    });

    return (
      <View>
        <CitiesListHeader addCity={ this.props.addCity } duplicateCheck={ this.isDuplicateCity } />
        <View style={ [styles.list] }>
          { 
            cities ||
            <Text style={ [styles.textCenter] }>No cities to display</Text> 
          }
        </View>
      </View>
    );
  }
}

export default CitiesList;
