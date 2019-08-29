import { GET_SUCCESS, CLEAR_SUCCESS } from './types';
export const getSuccess = () => {
	return {
		type: GET_SUCCESS,
		payload: true
	};
};
export const clearSuccess = () => {
	return {
		type: CLEAR_SUCCESS,
		payload: null
	};
};
