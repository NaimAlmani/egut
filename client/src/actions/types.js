//ERRORS
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
//AUTH
export const SET_LOGGED = 'SET_LOGGED';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_LOGGING_IN = 'SET_LOGGING_IN';
//LOADING
export const LOADING = 'LOADING';
export const NOT_LOADING = 'NOT_LOADING';
export const SET_LOADING = 'SET_LOADING';
//ORGANIZATION
export const GET_ALL_ORGS = 'GET_ALL_ORGS';
export const ADD_NEW_ORG = 'ADD_NEW_ORG';
export const SHOW_EDIT = 'SHOW_EDIT';
export const UPDATE_ORG = 'UPDATE_ORG';
export const DELETE_ORG = 'DELETE_ORG';

//PLACE
export const GET_ALL_PLACES = 'GET_ALL_PLACES';
export const ADD_NEW_PLACE = 'ADD_NEW_PLACE';
export const SHOW_EDIT_PLACE = 'SHOW_EDIT_PLACE';
export const UPDATE_PLACE = 'UPDATE_PLACE';
export const DELETE_PLACE = 'DELETE_PLACE';

//GROUP
export const GET_ALL_GROUPS = 'GET_ALL_GROUPS';
export const ADD_NEW_GROUP = 'ADD_NEW_GROUP';
export const SHOW_EDIT_GROUP = 'SHOW_EDIT_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const SELECT_GROUP_iCON = 'SELECT_GROUP_iCON';
export const SHOW_GROUP_ICON = 'SHOW_GROUP_ICON';
export const RESET_GROUP_ICON = 'RESET_GROUP_ICON';
export const GROUP_BY_ID = 'GROUP_BY_ID';
//GROUP
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
export const SHOW_EDIT_CATEGORY = 'SHOW_EDIT_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const SELECT_CATEGORY_iCON = 'SELECT_CATEGORY_iCON';
export const SHOW_CATEGORY_ICON = 'SHOW_CATEGORY_ICON';
export const RESET_CATEGORY_ICON = 'RESET_CATEGORY_ICON';
export const CATEGORY_BY_ID = 'CATEGORY_BY_ID';

//SLIDE
export const GET_ALL_SLIDES = 'GET_ALL_SLIDES';
export const ADD_NEW_SLIDE = 'ADD_NEW_SLIDE';
export const SHOW_EDIT_SLIDE = 'SHOW_EDIT_SLIDE';
export const UPDATE_SLIDE = 'UPDATE_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';
/**
 * Activity 
 */
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const ADD_NEW_ACTIVITY = 'ADD_NEW_ACTIVITY';
export const SHOW_EDIT_ACTIVITY = 'SHOW_EDIT_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const ACTIVITY_BY_ID = 'ACTIVITY_BY_ID';
// activity orgs
export const ACTIVITY_SELECT_ORG = 'ACTIVITY_SELECT_ORG';
export const ACTIVITY_DESELECT_ORG = 'ACTIVITY_DESELECT_ORG';
export const ADD_ORG_TO_ACTIVITY = 'ADD_ORG_TO_ACTIVITY';
export const DELETE_ORG_FROM_ACTIVITY = 'DELETE_ORG_FROM_ACTIVITY';
//activity groups
export const ACTIVITY_SELECT_GROUP = 'ACTIVITY_SELECT_GROUP';
export const ACTIVITY_DESELECT_GROUP = 'ACTIVITY_DESELECT_GROUP';
export const ADD_GROUP_TO_ACTIVITY = 'ADD_GROUP_TO_ACTIVITY';
export const DELETE_GROUP_FROM_ACTIVITY = 'DELETE_GROUP_FROM_ACTIVITY';
//activity categories
export const ACTIVITY_SELECT_CATEGORY = 'ACTIVITY_SELECT_CATEGORY';
export const ACTIVITY_DESELECT_CATEGORY = 'ACTIVITY_DESELECT_CATEGORY';
export const ADD_CATEGORY_TO_ACTIVITY = 'ADD_CATEGORY_TO_ACTIVITY';
export const DELETE_CATEGORY_FROM_ACTIVITY = 'DELETE_CATEGORY_FROM_ACTIVITY';
//activity PLACE
export const ACTIVITY_SELECT_PLACE = 'ACTIVITY_SELECT_PLACE';
export const ACTIVITY_DESELECT_PLACE = 'ACTIVITY_DESELECT_PLACE';
export const ADD_PLACE_TO_ACTIVITY = 'ADD_PLACE_TO_ACTIVITY';
export const DELETE_PLACE_FROM_ACTIVITY = 'DELETE_PLACE_FROM_ACTIVITY';
export const PLACE_BY_ID = 'PLACE_BY_ID';
export const CHANGE_PLACE_BACKGROUND = 'CHANGE_PLACE_BACKGROUND';
//activity TIME
export const ACTIVITY_SELECT_TIME = 'ACTIVITY_SELECT_TIME';
export const ACTIVITY_DESELECT_TIME = 'ACTIVITY_DESELECT_TIME';
export const ADD_TIME_TO_ACTIVITY = 'ADD_TIME_TO_ACTIVITY';
export const DELETE_TIME_FROM_ACTIVITY = 'DELETE_TIME_FROM_ACTIVITY';
export const GET_ALL_DAYS = 'GET_ALL_DAYS';
//activity images
export const ADD_NEW_IMAGE = 'ADD_NEW_IMAGE';
export const DELETE_IMAGE_FROM_ACTIVITY = 'DELETE_IMAGE_FROM_ACTIVITY';
//ACTIVITY CONTACTS
export const ADD_NEW_CONTACT = 'ADD_NEW_CONTACT';
export const DELETE_CONTACT_FROM_ACTIVITY = 'DELETE_CONTACT_FROM_ACTIVITY';
export const ACTIVITY_SELECT_CONTACT = 'ACTIVITY_SELECT_CONTACT';
export const ACTIVITY_DESELECT_CONTACT = 'ACTIVITY_DESELECT_CONTACT';
export const GET_ALL_CONTACTS = 'GET_ALL_CONTACTS';
export const ADD_EXIST_CONTACTS = 'ADD_EXIST_CONTACTS';
// ACTIVITY members
export const ACTIVITY_ACTIVATE_MEMBER = 'ACTIVITY_ACTIVATE_MEMBER';

export const WEEKLY_ACTIVITIES = 'WEEKLY_ACTIVITIES';
/******************************organization*************************************** */
export const ORGANIZATION_BY_ID = 'ORGANIZATION_BY_ID';
export const DELETE_IMAGE_FROM_ORG = 'DELETE_IMAGE_FROM_ORG';
export const ADD_NEW_IMAGE_TO_ORG = 'ADD_NEW_IMAGE_TO_ORG';
export const CHANGE_ORG_BACKGROUND = 'CHANGE_ORG_BACKGROUND';
export const ACTIVATE_ACTIVITY = 'ACTIVATE_ACTIVITY,';
/******emails */
export const GET_ALL_EMAILS = 'GET_ALL_EMAILS';
export const RECIEVE_PUSHED_EMAIL = 'RECIEVE_PUSHED_EMAIL';
export const CLEAR_NEW_EMAIL = 'CLEAR_NEW_EMAIL';
export const SELECT_EMAIL = 'SELECT_EMAIL';
export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_TO_ACTIVITY_MEMBERS = 'SEND_EMAIL_TO_ACTIVITY_MEMBERS';
/******notifiactions */
export const GET_ALL_NOTIFICATIONS = 'GET_ALL_NOTIFICATIONS';
export const RECIEVE_PUSHED_NOTIFICATION = 'RECIEVE_PUSHED_NOTIFICATION';
export const CLEAR_NEW_NOTIFICATION = 'CLEAR_NEW_NOTIFICATION';
export const SELECT_NOTIFICATION = 'SELECT_NOTIFICATION';
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
/*********************** SETTINGS */
export const GET_SETTINGS = 'GET_SETTINGS';
export const CHANGE_MAIN_ORG = 'CHANGE_MAIN_ORG';
