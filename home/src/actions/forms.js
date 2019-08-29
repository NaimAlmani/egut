import { INCOME_EMAIL, SUBSCRIP_EMAIL, PARTICIPATE_MEMBER } from './types';
import { getErrors } from './errors';
import { getSuccess } from './success';
import { startLoading, endLoading } from './loading';
import axiosInstance from './../utils/axiosInstance';

export const sendEmail = (data) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/email/income', data)
		.then((res) => {
			dispatch(endLoading());
			return {
				type: INCOME_EMAIL,
				payload: null
			};
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const subscripeEmail = (data) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/subscription/create', data)
		.then((res) => {
			dispatch(endLoading());
			dispatch(getSuccess());
			return {
				type: SUBSCRIP_EMAIL,
				payload: null
			};
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
export const participate = (data) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/member/participate', data)
		.then((res) => {
			dispatch(endLoading());
			dispatch(getSuccess());

			return {
				type: PARTICIPATE_MEMBER,
				payload: null
			};
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
