import axiosInstance from './../utils/axiosInstance';
import {
	GET_ALL_GROUPS,
	ADD_NEW_GROUP,
	SHOW_EDIT_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
	SELECT_GROUP_iCON,
	RESET_GROUP_ICON,
	SHOW_GROUP_ICON
} from './types';
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
//create group
export const addNewGroup = (group) => (dispatch) => {
	dispatch(startLoading());
	const gr = {
		name: group.name,
		description: group.description,
		icon_name: group.icon_name,
		icon_font: group.icon_font
	};
	console.table(gr);
	axiosInstance
		.post('/api/group/create', gr)
		.then((res) => {
			console.table(res.data);
			dispatch({
				type: ADD_NEW_GROUP,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//update group
export const updateGroup = (group) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('id', group.id);
	formData.set('name', group.name);
	formData.set('description', group.description);
	formData.set('icon_name', group.icon_name);
	formData.set('icon_font', group.icon_font);
	axiosInstance
		.post('/api/group/update', formData)
		.then((res) => {
			dispatch({
				type: UPDATE_GROUP,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const deleteGroup = (group) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/group/delete', group)
		.then((res) => {
			dispatch({
				type: DELETE_GROUP,
				payload: group.id
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const showEditGroup = (group, isShow) => (dispatch) => {
	dispatch({
		type: SHOW_EDIT_GROUP,
		payload: { group, isShow }
	});
};
export const selectGroupIcon = (Icon) => (dispatch) => {
	dispatch({
		type: SELECT_GROUP_iCON,
		payload: Icon
	});
};
export const showIcon = (isShow) => (dispatch) => {
	dispatch({
		type: SHOW_GROUP_ICON,
		payload: isShow
	});
};
export const resetIcon = () => (dispatch) => {
	dispatch({
		type: RESET_GROUP_ICON,
		payload: null
	});
};
