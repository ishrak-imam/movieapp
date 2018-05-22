
import {createAction} from '../../utils/reduxHelpers';

export const INIT = 'INIT';

export const LOGIN_REQ = 'LOGIN_REQ';
export const LOGIN_SUCS = 'LOGIN_SUCS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCS = 'GET_USER_SUCS';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export const REGISTER_REQ = 'REGISTER_REQ';
export const REGISTER_SUCS = 'REGISTER_SUCS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const LOGOUT_REQ = 'LOGOUT_REQ';
export const LOGOUT_SUCS = 'LOGOUT_SUCS';

export const init = createAction(INIT);

export const loginReq = createAction(LOGIN_REQ);
export const loginSucs = createAction(LOGIN_SUCS);
export const loginFail = createAction(LOGIN_FAIL);

export const facebookLoginReq = createAction(FACEBOOK_LOGIN);

export const getUser = createAction(GET_USER);
export const getUserSucs = createAction(GET_USER_SUCS);
export const getUserFail = createAction(GET_USER_FAIL);

export const registerReq = createAction(REGISTER_REQ);
export const registerSucs = createAction(REGISTER_SUCS);
export const registerFail = createAction(REGISTER_FAIL);

export const logoutReq = createAction(LOGOUT_REQ);
export const logoutSucs = createAction(LOGOUT_SUCS);
