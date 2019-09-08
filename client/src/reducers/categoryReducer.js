import {
	GET_ALL_CATEGORIES,
	ADD_NEW_CATEGORY,
	SHOW_EDIT_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
	SELECT_CATEGORY_iCON,
	SHOW_CATEGORY_ICON,
	RESET_CATEGORY_ICON,
	CATEGORY_BY_ID
} from '../actions/types';

const initialState = {
	categories: [],
	selectedCategory: {},
	currentCategory: {},
	activities: [],
	isEdit: false,
	icon: {},
	isShowIcons: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_CATEGORIES:
			return {
				...state,
				categories: action.payload
			};
		case ADD_NEW_CATEGORY:
			return {
				...state,
				categories: [ action.payload, ...state.categories ]
			};
		case SHOW_EDIT_CATEGORY:
			return {
				...state,
				selectedCategory: action.payload.category,
				isEdit: action.payload.isShow
			};
		case UPDATE_CATEGORY:
			const newCategories = state.categories;
			const currentIndex = state.categories.findIndex((x) => x.id === action.payload.id);
			newCategories[currentIndex] = action.payload;
			return {
				...state,
				categories: [ ...newCategories ]
			};
		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter((c) => c.id !== action.payload)
			};
		case SELECT_CATEGORY_iCON:
			return {
				...state,
				icon: action.payload,
				isShowIcons: false
			};
		case SHOW_CATEGORY_ICON:
			return {
				...state,
				isShowIcons: true
			};
		case RESET_CATEGORY_ICON:
			return {
				...state,
				icon: {}
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
