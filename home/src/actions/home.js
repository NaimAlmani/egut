import axiosInstance from './../utils/axiosInstance';
import { GET_HOME_INFO } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getHomeInfo = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/home')
		.then((res) => {
			dispatch({
				type: GET_HOME_INFO,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
