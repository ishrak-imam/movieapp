
import {fromJS, Map, List} from 'immutable';

export const getImmutableObject = plainObject => {
  return fromJS(plainObject);
};

export const getMap = plainObject => {
  return Map(plainObject);
};

export const updateMap = (state, payload) => {
  return state.mergeDeep(payload);
};

export const getList = plainArray => {
  return List(plainArray);
};

export const concatList = (list1, list2) => {
  return list1.concat(list2);
};

export const mergeMapShallow = (map1, map2) => {
  return map1.merge(map2);
};
