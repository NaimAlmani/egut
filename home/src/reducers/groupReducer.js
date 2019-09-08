import { GET_HOME_INFO, GROUP_BY_ID } from '../actions/types';

const initialState = {
	groups: [],
	currentGroup: {},
	activities: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_HOME_INFO:
			return {
				...state,
				groups: action.payload.groups
			};
		case GROUP_BY_ID:
			return {
				...state,
				currentGroup: action.payload.group,
				activities: action.payload.activities
			};
		default:
			return state;
	}
}
