import axiosInstance from './../utils/axiosInstance';
import {
	GET_ALL_CATEGORIES,
	ADD_NEW_CATEGORY,
	SHOW_EDIT_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
	SELECT_CATEGORY_iCON,
	RESET_CATEGORY_ICON,
	SHOW_CATEGORY_ICON
} from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const getAllCategories = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/categories')
		.then((res) => {
			dispatch({
				type: GET_ALL_CATEGORIES,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//create category
export const addNewCategory = (category) => (dispatch) => {
	dispatch(startLoading());
	const gr = {
		name: category.name,
		description: category.description,
		icon_name: category.icon_name,
		icon_font: category.icon_font
	};
	axiosInstance
		.post('/api/category/create', gr)
		.then((res) => {
			console.table(res.data);
			dispatch({
				type: ADD_NEW_CATEGORY,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
//update category
export const updateCategory = (category) => (dispatch) => {
	dispatch(startLoading());
	const formData = new FormData();
	formData.set('id', category.id);
	formData.set('name', category.name);
	formData.set('description', category.description);
	formData.set('icon_name', category.icon_name);
	formData.set('icon_font', category.icon_font);
	axiosInstance
		.post('/api/category/update', formData)
		.then((res) => {
			dispatch({
				type: UPDATE_CATEGORY,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const deleteCategory = (category) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/category/delete', category)
		.then((res) => {
			dispatch({
				type: DELETE_CATEGORY,
				payload: category.id
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};

export const showEditCategory = (category, isShow) => (dispatch) => {
	dispatch({
		type: SHOW_EDIT_CATEGORY,
		payload: { category, isShow }
	});
};
export const selectCategoryIcon = (Icon) => (dispatch) => {
	dispatch({
		type: SELECT_CATEGORY_iCON,
		payload: Icon
	});
};
export const showIcon = (isShow) => (dispatch) => {
	dispatch({
		type: SHOW_CATEGORY_ICON,
		payload: isShow
	});
};
export const resetIcon = () => (dispatch) => {
	dispatch({
		type: RESET_CATEGORY_ICON,
		payload: null
	});
};
