
import {createAction} from '../../utils/reduxHelpers';

export const CHECK_CONNECTION = 'CHECK_CONNECTION';
export const CONNECTION_STATUS = 'CONNECTION_STATUS';

export const checkConnection = createAction(CHECK_CONNECTION);
export const connectionStatus = createAction(CONNECTION_STATUS);
