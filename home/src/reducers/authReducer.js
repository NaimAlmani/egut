import isEmpty from '../validation/is-empty';

import { SET_LOGGED, SET_CURRENT_USER } from '../actions/types';

const initialState = {
	isAuthenticated: false,
	admin: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_LOGGED:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload) ? true : false
			};
		case SET_CURRENT_USER:
			return {
				...state,
				admin: action.payload.success
			};
		default:
			return state;
	}
}
