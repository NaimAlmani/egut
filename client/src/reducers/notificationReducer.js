import { GET_ALL_EMAILS, RECIEVE_PUSHED_EMAIL, CLEAR_NEW_EMAIL, SELECT_EMAIL } from '../actions/types';

const initialState = {
	emails: [],
	newEmail: {},
	selectedEmail: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_EMAILS:
			return {
				...state,
				emails: action.payload
			};

		case RECIEVE_PUSHED_EMAIL:
			return {
				...state,
				emails: [ action.payload, ...state.emails ],
				newEmail: action.payload
			};
		case CLEAR_NEW_EMAIL:
			return {
				...state,
				newEmail: {}
			};
		case SELECT_EMAIL:
			const index = state.emails.findIndex((c) => c.id === action.payload);
			console.log('email');
			console.log(index);
			const newEmails = state.emails;
			newEmails[index].read = 1;
			return {
				...state,
				selectedEmail: newEmails[index],
				emails: newEmails
			};
		default:
			return state;
	}
}
