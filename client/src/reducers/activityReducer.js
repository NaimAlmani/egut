import {
	GET_ALL_ACTIVITIES,
	ADD_NEW_ACTIVITY,
	SHOW_EDIT_ACTIVITY,
	UPDATE_ACTIVITY,
	DELETE_ACTIVITY,
	ACTIVITY_BY_ID,
	ACTIVITY_SELECT_ORG,
	ACTIVITY_DESELECT_ORG,
	ADD_ORG_TO_ACTIVITY,
	DELETE_ORG_FROM_ACTIVITY,
	ADD_GROUP_TO_ACTIVITY,
	DELETE_GROUP_FROM_ACTIVITY
} from '../actions/types';

const initialState = {
	activities: [],
	currentActivity: {},
	selectedActivity: {},
	isEdit: false,
	selectedOrgs: [],
	orgs: [],
	groups: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ACTIVITIES:
			return {
				...state,
				activities: action.payload
			};
		case ADD_NEW_ACTIVITY:
			return {
				...state,
				activities: [ action.payload, ...state.activities ]
			};
		case SHOW_EDIT_ACTIVITY:
			return {
				...state,
				selectedActivity: action.payload.activity,
				isEdit: action.payload.isShow
			};
		case UPDATE_ACTIVITY:
			const oldActivities = state.activities.filter((o) => o.id !== action.p);
			return {
				...state,
				activities: [ action.payload, ...oldActivities ],
				selectedActivity: action.payload,
				currentActivity: action.payload
			};
		case DELETE_ACTIVITY:
			return {
				...state,
				activities: state.activities.filter((c) => c.id !== action.payload)
			};
		case ACTIVITY_BY_ID:
			return {
				...state,
				currentActivity: action.payload.activity,
				orgs: action.payload.organizations
			};

		case ACTIVITY_SELECT_ORG:
			return {
				...state,
				selectedOrgs: [ ...state.selectedOrgs, action.payload ]
			};
		case ACTIVITY_DESELECT_ORG:
			return {
				...state,
				selectedOrgs: state.selectedOrgs.filter((org) => org.id !== action.payload.id)
			};
		case ADD_ORG_TO_ACTIVITY:
			return {
				...state,
				orgs: [ ...state.orgs, ...action.payload ]
			};
		case DELETE_ORG_FROM_ACTIVITY:
			return {
				...state,
				orgs: state.orgs.filter((o) => o.id !== action.payload.id)
			};
		case ADD_GROUP_TO_ACTIVITY:
			return {
				...state,
				groups: [ ...state.groups, ...action.payload ]
			};
		case DELETE_GROUP_FROM_ACTIVITY:
			return {
				...state,
				groups: state.groups.filter((o) => o.id !== action.payload.id)
			};
		default:
			return state;
	}
}
