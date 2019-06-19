import { LOADING, NOT_LOADING } from './types';
export const startLoading = () => {
	return {
		type: LOADING,
		payload: null
	};
};
export const endLoading = () => {
	return {
		type: NOT_LOADING,
		payload: null
	};
};

export const setLoading = (isLoading) => {
	return {
		type: NOT_LOADING,
		payload: isLoading
	};
};
