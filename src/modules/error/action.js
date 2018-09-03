
import {createAction} from '../../utils/reduxHelpers';

export const API_CALL_ERROR = 'API_CALL_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const apiCallError = createAction(API_CALL_ERROR);
export const clearError = createAction(CLEAR_ERROR);
