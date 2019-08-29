import axiosInstance from './../utils/axiosInstance';
import { GET_ALL_EMAILS, RECIEVE_PUSHED_EMAIL, CLEAR_NEW_EMAIL, SELECT_EMAIL, SEND_EMAIL } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token

export const getAllEmails = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/email/allemails')
		.then((res) => {
			dispatch({
				type: GET_ALL_EMAILS,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const addPushedEmail = (email) => (dispatch) => {
	dispatch({
		type: RECIEVE_PUSHED_EMAIL,
		payload: email
	});
};
export const clearNewEmail = () => (dispatch) => {
	dispatch({
		type: CLEAR_NEW_EMAIL,
		payload: null
	});
};

export const SelectEmail = (email, read) => (dispatch) => {
	if (read === false) {
		dispatch(startLoading());
		axiosInstance
			.post('/api/email/markasread', {
				id: email
			})
			.then((res) => {
				dispatch({
					type: SELECT_EMAIL,
					payload: email
				});
				dispatch(endLoading());
			})
			.catch((err) => {
				dispatch(endLoading());
				dispatch(getErrors(err.response.data));
			});
	} else {
		dispatch({
			type: SELECT_EMAIL,
			payload: email
		});
	}
};
export const sendEmail = (data) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/email/send', data)
		.then((res) => {
			dispatch(endLoading());
			return {
				type: SEND_EMAIL,
				payload: null
			};
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
