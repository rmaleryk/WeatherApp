"use strict";

import {
  AsyncStorage
} from "react-native";

const parse = data => {
  var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

  let dateParser = (key, value) => {
    if (typeof value === "string") {
      var _value = reISO.exec(value);
      if (_value) {
        return new Date(value);
      }
      _value = reMsAjax.exec(value);
      if (_value) {
        var b = _value[1].split(/[-+,.]/);
        return new Date(b[0] ? Number(b[0]) : 0 - Number(b[1]));
      }
    }
    return value;
  };

  return JSON.parse(data, dateParser);
};

export default class TabletStorage {
  async get(storageKey) {
    let data = await AsyncStorage.getItem(storageKey);

    if (!data) {
      return null;
    }

    data = parse(data);

    if (data instanceof Array) {
      return data.map(entity => parse(entity));
    }

    return data;
  }

  async set(storageKey, data) {
    var stringifyItem = null;
    if (data instanceof Array) {
      stringifyItem = JSON.stringify(data.map(entity => JSON.stringify(entity)));
    } else {
      stringifyItem = JSON.stringify(data);
    }

    await AsyncStorage.setItem(storageKey, stringifyItem);
  }

  async add(storageKey, entity) {
    let data = await this.get(storageKey);
    if (!data) {
      data = [];
    }

    data.push(entity);

    await this.set(storageKey, data);
  }

  async clearStorage() {
    return await AsyncStorage.clear();
  }
}
