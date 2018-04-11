import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert
} from "react-native";

import CitiesListItem from "./CitiesListItem";
import CityModel from "../../shared/models/CityModel";
import OpenWeatherService from '../../services/OpenWeatherService';

const styles = StyleSheet.create({
  header: {
    flex: 0,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    marginBottom: 10
  },
  input: {
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

class CitiesListHeader extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.addCity = this.addCity.bind(this);
    this.state = {
      inputValue: ""
    }

    this.openWeatherService = new OpenWeatherService();
  }

  addCity() {
    if(this.props.duplicateCheck(this.state.inputValue)) {
      Alert.alert("Add city error", "The city is already on your list.");
      return;
    }

    this.openWeatherService.isCityExists(this.state.inputValue)
      .then(
        (isCityExist) => {
          if(isCityExist) {
            const cityModel = new CityModel();
            cityModel.name = this.state.inputValue;
            
            this.setState({
              inputValue: "",
            })

            this.props.addCity(cityModel);
          } else {
            Alert.alert("Add city error", "The city is not found.");
          }
      });
  }

  render() {
    return (
      <View style={ [styles.header] }>
        <View style={ { flex: 1 } }>
          <TextInput
            style={ styles.input }
            onChangeText={ (text) => this.setState({ inputValue: text }) }
            value={ this.state.inputValue }
            placeholder="City (ex. Odessa, UA)"
          />
        </View>
        <Button
          onPress={ this.addCity }
          title="Add"
          color="darkorange"
          style={ styles.button }
          disabled={ this.state.inputValue == "" }
        />
      </View>
    );
  }
}

export default CitiesListHeader;
