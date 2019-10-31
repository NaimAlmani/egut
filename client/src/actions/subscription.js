import axiosInstance from './../utils/axiosInstance';
import { GET_ALL_SUBSCRIPTIONS, DELETE_SUBSCRIPTION } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getAllSubscriptions = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/subscriptions')
		.then((res) => {
			dispatch({
				type: GET_ALL_SUBSCRIPTIONS,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//create slide
export const deleteSubscription = (data) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/subscription/delete', data)
		.then((res) => {
			dispatch({
				type: DELETE_SUBSCRIPTION,
				payload: data.id
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
