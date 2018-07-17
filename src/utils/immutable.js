
import {Map, List, fromJS} from 'immutable';

export const getImmutableObject = plainObject => {
  return fromJS(plainObject);
};

/**
 * Map methods
 */

export const getMap = plainObject => {
  return Map(plainObject);
};

export const mergeMapShallow = (map1, map2) => {
  return map1.merge(map2);
};

export const mergeMapDeep = (map1, map2) => {
  return map1.mergeDeep(map2);
};

/**
 * List methods
 */

export const getList = plainArray => {
  return List(plainArray);
};

export const concatList = (list1, list2) => {
  return list1.concat(list2);
};
