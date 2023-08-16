import create from "zustand";

const _storeMap = {};

export const createVolatilleStore = (name, blueprintCallback) => {
  if (!!_storeMap[name])
    throw `ERROR: Trying to memoize a store that already exists - ${name}`;

  const storeRef = create(blueprintCallback);
  _storeMap[name] = () => storeRef;
}

export const getExistentStores = () => Object.keys(_storeMap);