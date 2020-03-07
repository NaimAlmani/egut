import {
  GET_ALL_ACTIVITIES,
  ACTIVITY_BY_ID,
  SELECT_CATEGORY,
  SELECT_GROUP,
  GET_ALL_DAYS,
  GET_ALL_IMAGES
} from '../actions/types';
import foriegnItems from './../utils/foriegnItems';
import filterActivities from './../utils/filterActivities';
const initialState = {
  activities: [],
  fActivities: [],
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
  selectedDays: [],
  //images
  images: [],

  //contacts
  contacts: [],
  allContacts: [],
  selectedContacts: [],
  days: [],

  allImages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    // activities page
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload.activities,
        days: action.payload.days,
        categories: action.payload.categories,
        groups: action.payload.groups,
        fActivities: action.payload.activities
      };
    case SELECT_CATEGORY:
      const selectedCat = state.categories.find(
        c => c.id === action.payload.id
      );
      let newCats;
      if (action.payload.isSelect === true) {
        newCats = [selectedCat, ...state.selectedCategories];
      } else {
        newCats = state.selectedCategories.filter(
          c => c.id !== action.payload.id
        );
      }

      const newActs = filterActivities(
        [...state.activities],
        newCats,
        state.selectedGroups,
        state.selectedDays
      );
      return {
        ...state,
        selectedCategories: newCats,
        fActivities: [...newActs]
      };
    case SELECT_GROUP:
      const selectedgr = state.groups.find(c => c.id === action.payload.id);
      let newGr;
      if (action.payload.isSelect === true) {
        newGr = [selectedgr, ...state.selectedGroups];
      } else {
        newGr = state.selectedGroups.filter(c => c.id !== action.payload.id);
      }
      const newGActs = filterActivities(
        state.activities,
        state.selectedCategories,
        newGr,
        state.selectedDays
      );
      return {
        ...state,
        selectedGroups: newGr,
        fActivities: newGActs
      };

    //end activities page
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
    case GET_ALL_DAYS:
      return {
        ...state,
        days: action.payload
      };
    case GET_ALL_IMAGES:
      return {
        ...state,
        allImages: action.payload
      };
    default:
      return state;
  }
}
