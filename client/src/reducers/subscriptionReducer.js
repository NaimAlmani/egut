import { GET_ALL_SUBSCRIPTIONS, DELETE_SUBSCRIPTION } from '../actions/types';

const initialState = {
	subscriptions: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_SUBSCRIPTIONS:
			return {
				...state,
				subscriptions: action.payload
			};
		case DELETE_SUBSCRIPTION:
			return {
				...state,
				subscriptions: state.subscriptions.filter((c) => c.id !== action.payload)
			};
		default:
			return state;
	}
}
