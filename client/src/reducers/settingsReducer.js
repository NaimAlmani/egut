import { GET_SETTINGS, CHANGE_MAIN_ORG } from '../actions/types';

const initialState = {
	organizations: [],
	mainOrg: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_SETTINGS:
			return {
				...state,
				organizations: action.payload,
				mainOrg: action.payload.filter((c) => c.is_main === 1)[0] || ''
			};
		case CHANGE_MAIN_ORG:
			return {
				...state,
				organizations: action.payload,
				mainOrg: action.payload.filter((c) => c.is_main === 1)[0] || ''
			};
		default:
			return state;
	}
}
