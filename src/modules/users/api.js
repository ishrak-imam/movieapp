
import {getUserData} from '../../utils/request';

export const getUsers = () => {
  return getUserData('https://randomuser.me/api/?page=1&results=30');
};
