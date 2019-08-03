import { GET_ALL_ORGS, ADD_NEW_ORG, SHOW_EDIT, UPDATE_ORG, DELETE_ORG, ORGANIZATION_BY_ID } from '../actions/types';

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
			const oldOrgs = state.orgs.filter((o) => o.id !== state.selectedOrg.id);
			return {
				...state,
				orgs: [ action.payload, ...oldOrgs ]
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

		default:
			return state;
	}
}
