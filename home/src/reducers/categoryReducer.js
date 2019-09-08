import { GET_HOME_INFO, CATEGORY_BY_ID } from '../actions/types';

const initialState = {
	categories: [],
	currentCategory: {},
	activities: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_HOME_INFO:
			return {
				...state,
				categories: action.payload.categories
			};
		case CATEGORY_BY_ID:
			return {
				...state,
				currentCategory: action.payload.category,
				activities: action.payload.activities
			};
		default:
			return state;
	}
}
