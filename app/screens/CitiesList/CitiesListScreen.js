import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";

import { connect } from "../../core/reduxUtils";
import * as weatherAppActions from "../../actions/weatherAppActions";
import CitiesList from "./CitiesList";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column'
  }
})

class CitiesListScreen extends PureComponent {
  static navigationOptions = {
    title: 'Cities list'
  }
  
  render() {
    return (
      <View style={ styles.page }>
        <CitiesList
          cities={ this.props.cities }
          addCity={ this.props.addCity }
          removeCity={ this.props.removeCity }
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cities: state.weatherApp.cities,
  ...ownProps
});

const mapDispatchToProps = {
  addCity: weatherAppActions.addCity,
  removeCity: weatherAppActions.removeCity
};

export default connect(mapStateToProps, mapDispatchToProps, CitiesListScreen);