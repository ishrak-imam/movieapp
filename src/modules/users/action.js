
import {createAction} from '../../utils/reduxHelpers';

export const USER_GET_REQ = 'USER_GET_REQ';
export const USER_GET_SUCS = 'USER_GET_SUCS';
export const USER_GET_FAIL = 'USER_GET_FAIL';

export const userGetReq = createAction(USER_GET_REQ);
export const userGetSucs = createAction(USER_GET_SUCS);
export const userGetFail = createAction(USER_GET_FAIL);
