import {
	GET_ALL_ORGS,
	ADD_NEW_ORG,
	SHOW_EDIT,
	UPDATE_ORG,
	DELETE_ORG,
	DELETE_IMAGE_FROM_ORG,
	ORGANIZATION_BY_ID,
	ADD_NEW_IMAGE_TO_ORG,
	CHANGE_ORG_BACKGROUND
} from '../actions/types';

const initialState = {
	orgs: [],
	selectedOrg: {},
	isEdit: false,
	currentOrganization: {},
	images: [],
	activities: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ORGS:
			return {
				...state,
				orgs: action.payload
			};
		case ADD_NEW_ORG:
			return {
				...state,
				orgs: [ action.payload, ...state.orgs ]
			};
		case SHOW_EDIT:
			return {
				...state,
				selectedOrg: action.payload.org,
				isEdit: action.payload.isShow
			};
		case UPDATE_ORG:
			const oldOrgs = state.orgs.filter((o) => o.id !== action.payload.id);
			return {
				...state,
				orgs: [ action.payload, ...oldOrgs ],
				selectedOrg: {}
			};
		case DELETE_ORG:
			return {
				...state,
				orgs: state.orgs.filter((c) => c.id !== action.payload)
			};
		case ORGANIZATION_BY_ID:
			return {
				...state,
				currentOrganization: action.payload.organization,
				images: action.payload.images,
				activities: action.payload.activities
			};
		case DELETE_IMAGE_FROM_ORG:
			return {
				...state,
				images: state.images.filter((img) => img.id !== action.payload)
			};
		case ADD_NEW_IMAGE_TO_ORG:
			return {
				...state,
				images: [ action.payload, ...state.images ]
			};
		case CHANGE_ORG_BACKGROUND:
			return {
				...state,
				currentOrganization: action.payload
			};
		default:
			return state;
	}
}
