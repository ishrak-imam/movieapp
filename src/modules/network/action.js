
import {createAction} from '../../utils/reduxHelpers';

export const CHECK_CONNECTION = 'CHECK_CONNECTION';
export const CONNECTION_STATUS = 'CONNECTION_STATUS';
export const START_CONNECTION_MONITOR = 'START_CONNECTION_MONITOR';
export const CONNECTION_TYPE = 'CONNECTION_TYPE';

export const checkConnection = createAction(CHECK_CONNECTION);
export const connectionStatus = createAction(CONNECTION_STATUS);
export const startConnectionMonitor = createAction(START_CONNECTION_MONITOR);
export const connectionType = createAction(CONNECTION_TYPE);
