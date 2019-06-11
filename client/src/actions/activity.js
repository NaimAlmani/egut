import axiosInstance from './../utils/axiosInstance';
import setAuthToken from '../utils/setAuthToken';
import {
	GET_ALL_ACTIVITIES,
	ADD_NEW_ACTIVITY,
	SHOW_EDIT_ACTIVITY,
	UPDATE_ACTIVITY,
	DELETE_ACTIVITY,
	ACTIVITY_BY_ID,
	ACTIVITY_SELECT_ORG,
	ACTIVITY_DESELECT_ORG,
	ADD_ORG_TO_ACTIVITY,
	DELETE_ORG_FROM_ACTIVITY,
	ACTIVITY_SELECT_GROUP,
	ACTIVITY_DESELECT_GROUP,
	ADD_GROUP_TO_ACTIVITY,
	DELETE_GROUP_FROM_ACTIVITY
} from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getAllActivities = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/activities')
		.then((res) => {
			dispatch({
				type: GET_ALL_ACTIVITIES,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//create activity
export const addNewActivity = (activity) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('name', activity.name);
	formData.set('description', activity.description);
	formData.set('is_active', activity.is_active);
	formData.append('logo', activity.logo);
	axiosInstance
		.post('/api/activity/create', formData)
		.then((res) => {
			dispatch({
				type: ADD_NEW_ACTIVITY,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//update activity
export const updateActivity = (activity) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('id', activity.id);
	formData.set('name', activity.name);
	formData.set('description', activity.description);
	formData.set('is_active', activity.is_active);
	formData.append('logo', activity.logo);
	axiosInstance
		.post('/api/activity/update', formData)
		.then((res) => {
			dispatch({
				type: UPDATE_ACTIVITY,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const deleteActivity = (activity) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/activity/delete', activity)
		.then((res) => {
			dispatch({
				type: DELETE_ACTIVITY,
				payload: activity.id
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const showEdit = (activity, isShow) => (dispatch) => {
	dispatch({
		type: SHOW_EDIT_ACTIVITY,
		payload: { activity, isShow }
	});
};
//view Activity
export const getActivityById = (id) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/activity/activitybyid', { id: id })
		.then((res) => {
			dispatch({
				type: ACTIVITY_BY_ID,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
export const SelectOrg = (org) => (dispatch) => {
	dispatch({
		type: ACTIVITY_SELECT_ORG,
		payload: org
	});
};
export const deselectOrg = (org) => (dispatch) => {
	dispatch({
		type: ACTIVITY_DESELECT_ORG,
		payload: org
	});
};
export const addOrgsToActivity = (activity, orgs) => (dispatch) => {
	dispatch(startLoading);
	axiosInstance
		.post('/api/activity/addorgs', { activity: activity, orgs: orgs })
		.then((res) => {
			dispatch({
				type: ADD_ORG_TO_ACTIVITY,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

//delete org from activity
export const deleteOrg = (activityID, orgID) => (dispatch) => {
	dispatch(startLoading);
	axiosInstance
		.post('/api/activity/deleteorg', { activity: activityID, org: orgID })
		.then((res) => {
			dispatch({
				type: DELETE_ORG_FROM_ACTIVITY,
				payload: orgID
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const SelectGroup = (group) => (dispatch) => {
	dispatch({
		type: ACTIVITY_SELECT_GROUP,
		payload: group
	});
};
export const deselectGroup = (group) => (dispatch) => {
	dispatch({
		type: ACTIVITY_DESELECT_GROUP,
		payload: group
	});
};
export const addGroupsToActivity = (activity, groups) => (dispatch) => {
	dispatch(startLoading);
	axiosInstance
		.post('/api/activity/addgroups', { activity: activity, groups: groups })
		.then((res) => {
			dispatch({
				type: ADD_GROUP_TO_ACTIVITY,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

//delete org from activity
export const deleteGroup = (activityID, groupID) => (dispatch) => {
	dispatch(startLoading);
	axiosInstance
		.post('/api/activity/deleteorg', { activity: activityID, group: groupID })
		.then((res) => {
			dispatch({
				type: DELETE_GROUP_FROM_ACTIVITY,
				payload: groupID
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
