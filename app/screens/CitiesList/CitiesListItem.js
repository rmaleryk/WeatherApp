import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert
} from "react-native";

const styles = StyleSheet.create({
  itemView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  }
});

class CitiesListItem extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.removeCity = this.removeCity.bind(this);
  }

  removeCity() {
    this.props.removeCity(this.props.city);
  }

  render() {
    return (
      <View style={ [styles.itemView] }>
        <Text>{ this.props.city.name }</Text>
        <Button
          onPress={ this.removeCity }
          title="Remove"
          color="darkorange"
        />
      </View>
    );
  }
}

export default CitiesListItem;
