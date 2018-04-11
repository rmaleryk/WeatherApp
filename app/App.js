import React, { PureComponent, Component } from "react";

import { connect } from "./core/reduxUtils";
import AppNavigator from "./AppNavigator";
import * as weatherAppActions from "./actions/weatherAppActions";
import StorageProvider from "./storage/StorageProvider";
import CityModel from "./shared/models/CityModel";
import { STORAGE_NAME } from "./core/constants"

class App extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.loadCities = this.loadCities.bind(this);
    this.initApp();
  }

  initApp() {
    this.loadCities();
  }

  loadCities() {
    const storage = new StorageProvider();
    const cityList = storage.get(STORAGE_NAME);
    
    cityList.then(
      (cities) => {
        const mappedCities = cities.map((city) => new CityModel(city));
        this.props.loadCities(mappedCities);
      }
    );
  }

  render() {
    return <AppNavigator />;
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
  loadCities: weatherAppActions.loadCities
};

export default connect(mapStateToProps, mapDispatchToProps, App);
