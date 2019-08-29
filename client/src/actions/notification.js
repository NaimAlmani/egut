import axiosInstance from './../utils/axiosInstance';
import {
	GET_ALL_NOTIFICATIONS,
	RECIEVE_PUSHED_NOTIFICATION,
	CLEAR_NEW_NOTIFICATION,
	SELECT_NOTIFICATION,
	SEND_NOTIFICATION
} from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token

export const getAllNotification = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/notification/allnotifications')
		.then((res) => {
			dispatch({
				type: GET_ALL_NOTIFICATIONS,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const addPushedNotification = (notification) => (dispatch) => {
	dispatch({
		type: RECIEVE_PUSHED_NOTIFICATION,
		payload: notification
	});
};
export const clearNewNotification = () => (dispatch) => {
	dispatch({
		type: CLEAR_NEW_NOTIFICATION,
		payload: null
	});
};

export const SelectNotification = (notification, read) => (dispatch) => {
	if (read === false) {
		dispatch(startLoading());
		axiosInstance
			.post('/api/notification/markasread', {
				id: notification
			})
			.then((res) => {
				dispatch({
					type: SELECT_NOTIFICATION,
					payload: notification
				});
				dispatch(endLoading());
			})
			.catch((err) => {
				dispatch(endLoading());
				dispatch(getErrors(err.response.data));
			});
	} else {
		dispatch({
			type: SELECT_NOTIFICATION,
			payload: notification
		});
	}
};
export const sendNotification = (data) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/notification/send', data)
		.then((res) => {
			dispatch(endLoading());
			return {
				type: SEND_NOTIFICATION,
				payload: null
			};
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
