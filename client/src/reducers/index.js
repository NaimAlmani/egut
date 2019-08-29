import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import customStylesReducer from './customStylesReducer';
import orgReducer from './orgReducer';
import placeReducer from './placeReducer';
import groupReducer from './groupReducer';
import activityReducer from './activityReducer';
import iconReducer from './iconReducer';
import categoryReducer from './categoryReducer';
import emailReducer from './emailReducer';
import notificationReducer from './notificationReducer';
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	loading: loadingReducer,
	customStyles: customStylesReducer,
	organization: orgReducer,
	place: placeReducer,
	group: groupReducer,
	category: categoryReducer,
	activity: activityReducer,
	icon: iconReducer,
	email: emailReducer,
	notification: notificationReducer
});
