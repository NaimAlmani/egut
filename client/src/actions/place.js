import axiosInstance from './../utils/axiosInstance';
import setAuthToken from '../utils/setAuthToken';
import { GET_ALL_PLACES, ADD_NEW_PLACE, SHOW_EDIT_PLACE, UPDATE_PLACE, DELETE_PLACE } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getAllPlaces = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/places')
		.then((res) => {
			dispatch({
				type: GET_ALL_PLACES,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//create place
export const addNewPlace = (place) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('name', place.name);
	formData.set('description', place.description);
	axiosInstance
		.post('/api/place/create', formData)
		.then((res) => {
			dispatch({
				type: ADD_NEW_PLACE,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//update place
export const updatePlace = (place) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('id', place.id);
	formData.set('name', place.name);
	formData.set('description', place.description);
	axiosInstance
		.post('/api/place/update', formData)
		.then((res) => {
			dispatch({
				type: UPDATE_PLACE,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const deletePlace = (place) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/place/delete', place)
		.then((res) => {
			dispatch({
				type: DELETE_PLACE,
				payload: place.id
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const showEditPlace = (place, isShow) => (dispatch) => {
	dispatch({
		type: SHOW_EDIT_PLACE,
		payload: { place, isShow }
	});
};
