import {
	GET_ALL_ACTIVITIES,
	ADD_NEW_ACTIVITY,
	SHOW_EDIT_ACTIVITY,
	UPDATE_ACTIVITY,
	DELETE_ACTIVITY,
	ACTIVITY_BY_ID,
	//activity orgs
	ACTIVITY_SELECT_ORG,
	ACTIVITY_DESELECT_ORG,
	ADD_ORG_TO_ACTIVITY,
	DELETE_ORG_FROM_ACTIVITY,
	//activity groups
	ACTIVITY_SELECT_GROUP,
	ACTIVITY_DESELECT_GROUP,
	ADD_GROUP_TO_ACTIVITY,
	DELETE_GROUP_FROM_ACTIVITY,
	//activity categories
	ACTIVITY_SELECT_CATEGORY,
	ACTIVITY_DESELECT_CATEGORY,
	ADD_CATEGORY_TO_ACTIVITY,
	DELETE_CATEGORY_FROM_ACTIVITY,
	//activity groups
	ACTIVITY_SELECT_PLACE,
	ACTIVITY_DESELECT_PLACE,
	ADD_PLACE_TO_ACTIVITY,
	DELETE_PLACE_FROM_ACTIVITY
} from '../actions/types';

const initialState = {
	activities: [],
	currentActivity: {},
	selectedActivity: {},
	isEdit: false,
	//activity orgs
	selectedOrgs: [],
	orgs: [],
	//activity groups
	selectedGroups: [],
	groups: [],

	//activity groups
	selectedPlaces: [],
	places: [],

	//activity categories
	selectedCategories: [],
	categories: []
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
				orgs: action.payload.organizations,
				groups: action.payload.groups
			};
		//activity orgs
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
		//activitry groups
		case ACTIVITY_SELECT_GROUP:
			return {
				...state,
				selectedGroups: [ ...state.selectedGroups, action.payload ]
			};
		case ACTIVITY_DESELECT_GROUP:
			return {
				...state,
				selectedGroups: state.selectedGroups.filter((org) => org.id !== action.payload.id)
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

		//activity categories
		case ACTIVITY_SELECT_CATEGORY:
			return {
				...state,
				selectedCategories: [ ...state.selectedCategories, action.payload ]
			};
		case ACTIVITY_DESELECT_CATEGORY:
			return {
				...state,
				selectedCategories: state.selectedCategories.filter((category) => category.id !== action.payload.id)
			};
		case ADD_CATEGORY_TO_ACTIVITY:
			return {
				...state,
				categories: [ ...state.categories, ...action.payload ]
			};
		case DELETE_CATEGORY_FROM_ACTIVITY:
			return {
				...state,
				categories: state.categories.filter((o) => o.id !== action.payload.id)
			};

		//activitry places
		case ACTIVITY_SELECT_PLACE:
			return {
				...state,
				selectedPlaces: [ ...state.selectedPlaces, action.payload ]
			};
		case ACTIVITY_DESELECT_PLACE:
			return {
				...state,
				selectedPlaces: state.selectedPlaces.filter((pl) => pl.id !== action.payload.id)
			};
		case ADD_PLACE_TO_ACTIVITY:
			return {
				...state,
				places: [ ...state.places, ...action.payload ]
			};
		case DELETE_PLACE_FROM_ACTIVITY:
			return {
				...state,
				places: state.places.filter((o) => o.id !== action.payload.id)
			};

		default:
			return state;
	}
}
