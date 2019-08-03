import axiosInstance from './../utils/axiosInstance';
import setAuthToken from '../utils/setAuthToken';
import { SET_LOGGED, SET_CURRENT_USER } from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/login', userData)
		.then((res) => {
			// Save to localStorage
			const { token, user } = res.data.success;
			// Set token to ls
			localStorage.setItem('jwtToken', token);
			localStorage.setItem('user', user);
			console.log('user');
			console.log(user);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			// Set current user
			dispatch(setLogged(user));
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(getErrors(err.response.data));
			dispatch(endLoading());
		});
};
// Set logged in user
export const setLogged = (name) => {
	return {
		type: SET_LOGGED,
		payload: name
	};
};

export const registerUser = (userData, history) => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/register', userData)
		.then((res) => {
			dispatch(endLoading());
			history.push('/login');
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(getErrors(err.response.data));
		});
};
// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	localStorage.removeItem('user');
	// Remove auth header for future requests
	setAuthToken(false);
	dispatch(setLogged(null));
};
export const setCurrentUser = () => (dispatch) => {
	dispatch(startLoading());
	axiosInstance
		.post('/api/details')
		.then((res) => {
			dispatch({
				type: SET_CURRENT_USER,
				payload: res.data
			});
			dispatch(endLoading());
		})
		.catch((err) => {
			dispatch(endLoading());
			dispatch(logoutUser());
			dispatch(getErrors(err.response.data));
		});
};
