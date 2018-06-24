
import {fromJS, Map} from 'immutable';

export const getImmutableObject = plainObject => {
  return fromJS(plainObject);
};

export const getMap = plainObject => {
  return Map(plainObject);
};

export const updateMap = (state, payload) => {
  return state.mergeDeep(payload);
};
