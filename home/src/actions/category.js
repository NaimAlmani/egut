import axiosInstance from './../utils/axiosInstance';
import { GET_ALL_CATEGORIES, CATEGORY_BY_ID } from './types';
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
export const getCategoryById = (id) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.get('/api/category/categorybyid', {
			params: {
				id: id
			}
		})
		.then((res) => {
			dispatch({
				type: CATEGORY_BY_ID,
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
