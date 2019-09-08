import axiosInstance from './../utils/axiosInstance';
import { GET_ALL_SLIDES, ADD_NEW_SLIDE, SHOW_EDIT_SLIDE, UPDATE_SLIDE, DELETE_SLIDE, SLIDE_BY_ID } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getAllSlides = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/slides')
		.then((res) => {
			dispatch({
				type: GET_ALL_SLIDES,
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
export const addNewSlide = (slide) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('title', slide.title);
	formData.set('subtitle', slide.subtitle);
	formData.append('image', slide.image);
	axiosInstance
		.post('/api/slide/create', formData)
		.then((res) => {
			dispatch({
				type: ADD_NEW_SLIDE,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//update slide
export const updateSlide = (slide) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('id', slide.id);
	formData.set('title', slide.title);
	formData.set('subtitle', slide.subtitle);
	formData.append('image', slide.image);
	axiosInstance
		.post('/api/slide/update', formData)
		.then((res) => {
			dispatch({
				type: UPDATE_SLIDE,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const deleteSlide = (slide) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/slide/delete', slide)
		.then((res) => {
			dispatch({
				type: DELETE_SLIDE,
				payload: slide.id
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const showEditSlide = (slide, isShow) => (dispatch) => {
	dispatch({
		type: SHOW_EDIT_SLIDE,
		payload: { slide, isShow }
	});
};

export const showEdit = (slide, isShow) => (dispatch) => {
	dispatch({
		type: SHOW_EDIT_SLIDE,
		payload: { slide, isShow }
	});
};
