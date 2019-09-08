import { GET_ALL_SLIDES, ADD_NEW_SLIDE, SHOW_EDIT_SLIDE, UPDATE_SLIDE, DELETE_SLIDE } from '../actions/types';

const initialState = {
	slides: [],
	selectedSlide: {},
	currentSlide: {},
	activities: [],
	isEdit: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_SLIDES:
			return {
				...state,
				slides: action.payload
			};
		case ADD_NEW_SLIDE:
			return {
				...state,
				slides: [ action.payload, ...state.slides ]
			};
		case SHOW_EDIT_SLIDE:
			return {
				...state,
				selectedSlide: action.payload.slide,
				isEdit: action.payload.isShow
			};
		case UPDATE_SLIDE:
			const oldPlaces = state.slides.filter((o) => o.id !== action.payload.id);
			return {
				...state,
				slides: [ action.payload, ...oldPlaces ]
			};
		case DELETE_SLIDE:
			return {
				...state,
				slides: state.slides.filter((c) => c.id !== action.payload)
			};

		default:
			return state;
	}
}
