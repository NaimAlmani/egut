import {
	GET_ALL_GROUPS,
	ADD_NEW_GROUP,
	SHOW_EDIT_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
	SELECT_GROUP_iCON,
	SHOW_GROUP_ICON
} from '../actions/types';

const initialState = {
	groups: [],
	selectedGroup: {},
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
			const oldPlaces = state.groups.filter((o) => o.id !== state.selectedGroup.id);
			return {
				...state,
				groups: [ action.payload, ...oldPlaces ]
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
		default:
			return state;
	}
}
