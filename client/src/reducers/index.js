import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import customStylesReducer from './customStylesReducer';
import orgReducer from './orgReducer';
import placeReducer from './placeReducer';
import slideReducer from './slideReducer';
import groupReducer from './groupReducer';
import activityReducer from './activityReducer';
import iconReducer from './iconReducer';
import categoryReducer from './categoryReducer';
import emailReducer from './emailReducer';
import notificationReducer from './notificationReducer';
import settingsReducer from './settingsReducer';
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	loading: loadingReducer,
	customStyles: customStylesReducer,
	organization: orgReducer,
	place: placeReducer,
	slide: slideReducer,
	group: groupReducer,
	category: categoryReducer,
	activity: activityReducer,
	icon: iconReducer,
	email: emailReducer,
	notification: notificationReducer,
	settings: settingsReducer
});
