import axiosInstance from './../utils/axiosInstance';
import { GET_SETTINGS, CHANGE_MAIN_ORG } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getSettings = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/orgs')
		.then((res) => {
			dispatch({
				type: GET_SETTINGS,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
export const changeMainOrg = (id) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('id', id);
	axiosInstance
		.post('/api/org/changemainorg', formData)
		.then((res) => {
			dispatch({
				type: CHANGE_MAIN_ORG,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
