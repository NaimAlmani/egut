import { GET_HOME_INFO } from '../actions/types';

const initialState = {
	slides: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_HOME_INFO:
			return {
				...state,
				slides: action.payload.slides
			};
		default:
			return state;
	}
}
