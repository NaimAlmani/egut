import axiosInstance from './../utils/axiosInstance';
import setAuthToken from '../utils/setAuthToken';
import { GET_ALL_ORGS, ADD_NEW_ORG, SHOW_EDIT, UPDATE_ORG, DELETE_ORG } from './types';
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
//create org
export const addNewOrg = (org) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('name', org.name);
	formData.set('description', org.description);
	formData.append('logo', org.logo);

	axiosInstance
		.post('/api/org/create', formData)
		.then((res) => {
			dispatch({
				type: ADD_NEW_ORG,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//update org
export const updateOrg = (org) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('id', org.id);
	formData.set('name', org.name);
	formData.set('description', org.description);
	formData.append('logo', org.logo);
	axiosInstance
		.post('/api/org/update', formData)
		.then((res) => {
			dispatch({
				type: UPDATE_ORG,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const deleteOrg = (org) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/org/delete', org)
		.then((res) => {
			dispatch({
				type: DELETE_ORG,
				payload: org.id
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const showEdit = (org, isShow) => (dispatch) => {
	dispatch({
		type: SHOW_EDIT,
		payload: { org, isShow }
	});
};
