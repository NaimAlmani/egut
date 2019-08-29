import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setLogged, logoutUser } from './actions/auth';
import { Provider } from 'react-redux';
import Root from './Root';
import isEmpty from './validation/is-empty';
import axiosInstance from './utils/axiosInstance';
import store from './store';
//notifications
import './App.css';
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	console.log('decoded');
	console.log(decoded);
	store.dispatch(setLogged(decoded.exp));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		// Logout user

		// Clear current Profile
		// Redirect to login
		window.location.href = '/login';
	}
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavOpen: true
		};
	}

	render() {
		return (
			<Provider store={store}>
				<Root />
			</Provider>
		);
	}
}
export default App;
