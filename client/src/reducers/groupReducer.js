import {
	GET_ALL_GROUPS,
	ADD_NEW_GROUP,
	SHOW_EDIT_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
	SELECT_GROUP_iCON,
	SHOW_GROUP_ICON,
	RESET_GROUP_ICON,
	GROUP_BY_ID
} from '../actions/types';

const initialState = {
	groups: [],
	selectedGroup: {},
	currentGroup: {},
	activities: [],
	isEdit: false,
	icon: {},
	isShowIcons: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_GROUPS:
			return {
				...state,
				groups: action.payload
			};
		case ADD_NEW_GROUP:
			return {
				...state,
				groups: [ action.payload, ...state.groups ]
			};
		case SHOW_EDIT_GROUP:
			return {
				...state,
				selectedGroup: action.payload.group,
				isEdit: action.payload.isShow
			};
		case UPDATE_GROUP:
			const newGroups = state.groups;
			const currentIndex = state.groups.findIndex((x) => x.id === action.payload.id);
			newGroups[currentIndex] = action.payload;
			return {
				...state,
				groups: [ ...newGroups ]
			};
		case DELETE_GROUP:
			return {
				...state,
				groups: state.groups.filter((c) => c.id !== action.payload)
			};
		case SELECT_GROUP_iCON:
			return {
				...state,
				icon: action.payload,
				isShowIcons: false
			};
		case SHOW_GROUP_ICON:
			return {
				...state,
				isShowIcons: true
			};
		case RESET_GROUP_ICON:
			return {
				...state,
				icon: {}
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
