import { GET_SUCCESS, CLEAR_SUCCESS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_SUCCESS:
			return true;
		case CLEAR_SUCCESS:
			return false;
		default:
			return state;
	}
}
