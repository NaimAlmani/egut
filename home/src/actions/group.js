import axiosInstance from './../utils/axiosInstance';
import { GET_ALL_GROUPS, GROUP_BY_ID } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getAllGroups = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/groups')
		.then((res) => {
			dispatch({
				type: GET_ALL_GROUPS,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const getGroupById = (id) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/group/groupbyid', {
			params: {
				id: id
			}
		})
		.then((res) => {
			dispatch({
				type: GROUP_BY_ID,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			console.log(err);
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
