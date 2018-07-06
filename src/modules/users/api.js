
import {getUserData} from '../../utils/request';

export const getUsers = (meta) => {
  return getUserData(`https://randomuser.me/api/?page=${meta.page}&results=${meta.results}`);
};
