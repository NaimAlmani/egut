import axiosInstance from './../utils/axiosInstance';
import setAuthToken from '../utils/setAuthToken';
import { GET_ALL_ORGS, ORGANIZATION_BY_ID } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getAllOrgs = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/orgs')
		.then((res) => {
			dispatch({
				type: GET_ALL_ORGS,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//view Activity
export const getOrgById = (id) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/organization/organizationbyid', {
			params: {
				id: id
			}
		})
		.then((res) => {
			dispatch({
				type: ORGANIZATION_BY_ID,
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
