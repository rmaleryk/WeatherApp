"use strict";

import TabletStorage from "./TabletStorage";

export default class StorageProvider {
  constructor(storage = new TabletStorage()) {
    this.storage = storage;
  }

  async clearStorage() {
    return await this.storage.clearStorage();
  }

  async get(storageKey) {
    return await this.storage.get(storageKey);
  }

  async set(storageKey, data) {
    return await this.storage.set(storageKey, data);
  }

  async add(storageKey, data) {
    return await this.storage.add(storageKey, data);
  }
}
