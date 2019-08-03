import axiosInstance from './../utils/axiosInstance';
import setAuthToken from '../utils/setAuthToken';
import {
	GET_ALL_ORGS,
	ADD_NEW_ORG,
	SHOW_EDIT,
	UPDATE_ORG,
	DELETE_ORG,
	ORGANIZATION_BY_ID,
	DELETE_IMAGE_FROM_ORG,
	ADD_NEW_IMAGE_TO_ORG,
	CHANGE_ORG_BACKGROUND
} from './types';
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
	console.log(org);
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('name', org.name);
	formData.set('description', org.description);
	formData.set('detail', org.detail);
	formData.set('website', org.website);
	formData.set('email', org.email);
	formData.set('tel', org.tel);
	formData.set('contact', org.contact);
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
	formData.set('detail', org.detail);
	formData.set('website', org.website);
	formData.set('email', org.email);
	formData.set('tel', org.tel);
	formData.set('contact', org.contact);
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

//view Activity
export const getOrgById = (id) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/organization/organizationbyid', {
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

export const deleteOrgImage = (id) => (dispatch) => {
	dispatch(startLoading);
	axiosInstance
		.post('/api/organization/deleteimage', { id: id })
		.then((res) => {
			dispatch({
				type: DELETE_IMAGE_FROM_ORG,
				payload: id
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
export const addNewImage = (imageData) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('title', imageData.title);
	formData.set('description', imageData.description);
	formData.append('path', imageData.path);
	formData.set('organization_id', imageData.organization_id);

	axiosInstance
		.post('/api/organization/addimage', formData)
		.then((res) => {
			dispatch({
				type: ADD_NEW_IMAGE_TO_ORG,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
export const changeOrgBackground = (imageData) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.append('path', imageData.path);
	formData.set('organization_id', imageData.organization_id);

	axiosInstance
		.post('/api/organization/changebackgound', formData)
		.then((res) => {
			dispatch({
				type: CHANGE_ORG_BACKGROUND,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
