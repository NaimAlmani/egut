import {
	GET_ALL_PLACES,
	ADD_NEW_PLACE,
	SHOW_EDIT_PLACE,
	UPDATE_PLACE,
	DELETE_PLACE,
	CHANGE_PLACE_BACKGROUND,
	PLACE_BY_ID
} from '../actions/types';

const initialState = {
	places: [],
	selectedPlace: {},
	currentPlace: {},
	activities: [],
	isEdit: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_PLACES:
			return {
				...state,
				places: action.payload
			};
		case ADD_NEW_PLACE:
			return {
				...state,
				places: [ action.payload, ...state.places ]
			};
		case SHOW_EDIT_PLACE:
			return {
				...state,
				selectedPlace: action.payload.place,
				isEdit: action.payload.isShow
			};
		case UPDATE_PLACE:
			const oldPlaces = state.places.filter((o) => o.id !== action.payload.id);
			return {
				...state,
				places: [ action.payload, ...oldPlaces ]
			};
		case DELETE_PLACE:
			return {
				...state,
				places: state.places.filter((c) => c.id !== action.payload)
			};

		case PLACE_BY_ID:
			return {
				...state,
				currentPlace: action.payload.place,
				activities: action.payload.activities
			};
		case CHANGE_PLACE_BACKGROUND:
			return {
				...state,
				currentPlace: action.payload
			};
		default:
			return state;
	}
}
