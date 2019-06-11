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
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	loading: loadingReducer,
	customStyles: customStylesReducer,
	organization: orgReducer,
	place: placeReducer,
	group: groupReducer,
	activity: activityReducer,
	icon: iconReducer
});
