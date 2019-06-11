import { LOADING, NOT_LOADING } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return true;
		case NOT_LOADING:
			return false;
		default:
			return state;
	}
}
