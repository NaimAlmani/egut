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
	//activity places
	ACTIVITY_SELECT_PLACE,
	ACTIVITY_DESELECT_PLACE,
	ADD_PLACE_TO_ACTIVITY,
	DELETE_PLACE_FROM_ACTIVITY,

	//activity places
	ACTIVITY_SELECT_TIME,
	ACTIVITY_DESELECT_TIME,
	ADD_TIME_TO_ACTIVITY,
	DELETE_TIME_FROM_ACTIVITY,
	GET_ALL_DAYS,

	// images
	ADD_NEW_IMAGE,
	DELETE_IMAGE_FROM_ACTIVITY,
	//contacts
	ADD_NEW_CONTACT,
	DELETE_CONTACT_FROM_ACTIVITY,
	ACTIVITY_SELECT_CONTACT,
	ACTIVITY_DESELECT_CONTACT,
	GET_ALL_CONTACTS,
	ADD_EXIST_CONTACTS,
	ACTIVITY_ACTIVATE_MEMBER,
	ACTIVATE_ACTIVITY,
	WEEKLY_ACTIVITIES
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

	//activity PLACES
	selectedPlaces: [],
	places: [],

	//activity categories
	selectedCategories: [],
	categories: [],

	//activity times
	selectedTimes: [],
	times: [],
	days: [],

	//images
	images: [],

	//contacts
	contacts: [],
	allContacts: [],
	selectedContacts: [],

	//schema
	times: []
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
				groups: action.payload.groups,
				places: action.payload.places,
				categories: action.payload.categories,
				times: action.payload.times,
				images: action.payload.images,
				contacts: action.payload.contacts,
				members: action.payload.members
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
				orgs: [ ...state.orgs, ...action.payload ],
				selectedOrgs: []
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
				groups: [ ...state.groups, ...action.payload ],
				selectedGroups: []
			};
		case DELETE_GROUP_FROM_ACTIVITY:
			return {
				...state,
				groups: state.groups.filter((o) => o.id !== action.payload.id),
				selectedGroups: []
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
				categories: [ ...state.categories, ...action.payload ],
				selectedCategories: []
			};
		case DELETE_CATEGORY_FROM_ACTIVITY:
			return {
				...state,
				categories: state.categories.filter((o) => o.id !== action.payload.id),
				selectedCategories: []
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
				places: [ ...state.places, ...action.payload ],
				selectedPlaces: []
			};
		case DELETE_PLACE_FROM_ACTIVITY:
			return {
				...state,
				places: state.places.filter((o) => o.id !== action.payload.id),
				selectedPlaces: []
			};

		//activitry TIMES
		case ACTIVITY_SELECT_TIME:
			return {
				...state,
				selectedTimes: [ ...state.selectedTimes, action.payload ]
			};
		case ACTIVITY_DESELECT_TIME:
			return {
				...state,
				selectedTimes: state.selectedTimes.filter((pl) => pl.id !== action.payload.id)
			};
		case ADD_TIME_TO_ACTIVITY:
			return {
				...state,
				times: [ ...state.times, action.payload ],
				selectedTimes: []
			};
		case DELETE_TIME_FROM_ACTIVITY:
			return {
				...state,
				times: state.times.filter((o) => o.id !== action.payload),
				selectedTimes: []
			};
		case GET_ALL_DAYS:
			return {
				...state,
				days: action.payload
			};
		case ADD_NEW_IMAGE:
			return {
				...state,
				images: [ action.payload, ...state.images ]
			};
		case DELETE_IMAGE_FROM_ACTIVITY:
			return {
				...state,
				images: state.images.filter((img) => img.id !== action.payload)
			};
		//contacts
		case ADD_NEW_CONTACT:
			return {
				...state,
				contacts: [ action.payload, ...state.contacts ]
			};
		case DELETE_CONTACT_FROM_ACTIVITY:
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact.id !== action.payload)
			};
		case ACTIVITY_SELECT_CONTACT:
			return {
				...state,
				selectedContacts: [ ...state.selectedContacts, action.payload ]
			};
		case ACTIVITY_DESELECT_CONTACT:
			return {
				...state,
				selectedContacts: state.selectedContacts.filter((c) => c.id !== action.payload.id)
			};
		case GET_ALL_CONTACTS:
			return {
				...state,
				allContacts: action.payload
			};
		case ADD_EXIST_CONTACTS:
			return {
				...state,
				selectedContacts: [],
				contacts: [ ...action.payload, ...state.contacts ]
			};
		//members

		case ACTIVITY_ACTIVATE_MEMBER:
			const index = state.members.findIndex((c) => c.id === action.payload.member_id);
			const newMembers = state.members;
			newMembers[index].pivot.is_active = action.payload.is_active === true ? 1 : 0;
			return {
				...state,
				members: newMembers
			};
		case ACTIVATE_ACTIVITY:
			const Actindex = state.activities.findIndex((c) => c.id === action.payload.id);
			const newActivities = state.activities;
			newActivities[Actindex].is_active = action.payload.is_active === true ? 1 : 0;
			return {
				...state,
				activities: newActivities
			};

		case WEEKLY_ACTIVITIES:
			return {
				...state,
				times: action.payload.times,
				activities: action.payload.activities
			};
		default:
			return state;
	}
}
