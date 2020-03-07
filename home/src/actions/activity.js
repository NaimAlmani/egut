import axiosInstance from './../utils/axiosInstance';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_ALL_ACTIVITIES,
  SELECT_CATEGORY,
  SELECT_GROUP,
  ACTIVITY_BY_ID,
  //org
  ACTIVITY_SELECT_ORG,
  ACTIVITY_DESELECT_ORG,
  ADD_ORG_TO_ACTIVITY,
  DELETE_ORG_FROM_ACTIVITY,
  //group
  ACTIVITY_SELECT_GROUP,
  ACTIVITY_DESELECT_GROUP,
  ADD_GROUP_TO_ACTIVITY,
  DELETE_GROUP_FROM_ACTIVITY,
  //category
  ACTIVITY_SELECT_CATEGORY,
  ACTIVITY_DESELECT_CATEGORY,
  ADD_CATEGORY_TO_ACTIVITY,
  DELETE_CATEGORY_FROM_ACTIVITY,
  //PLACE
  ACTIVITY_SELECT_PLACE,
  ACTIVITY_DESELECT_PLACE,
  ADD_PLACE_TO_ACTIVITY,
  DELETE_PLACE_FROM_ACTIVITY,

  //TIME
  ACTIVITY_SELECT_TIME,
  ACTIVITY_DESELECT_TIME,
  ADD_TIME_TO_ACTIVITY,
  DELETE_TIME_FROM_ACTIVITY,
  GET_ALL_DAYS,

  //IMAGE
  ADD_NEW_IMAGE,
  DELETE_IMAGE_FROM_ACTIVITY,
  //CONTACTS
  ADD_NEW_CONTACT,
  DELETE_CONTACT_FROM_ACTIVITY,
  ACTIVITY_SELECT_CONTACT,
  ACTIVITY_DESELECT_CONTACT,
  GET_ALL_CONTACTS,
  ADD_EXIST_CONTACTS,
  //MEMBERS
  ACTIVITY_ACTIVATE_MEMBER,
  GET_ALL_IMAGES
} from './types';
import { getErrors } from './errors';
import { startLoading, endLoading } from './loading';
//ACTIVITIES PAGE
export const getAllActivities = () => dispatch => {
  dispatch(startLoading());
  axiosInstance
    .get('/api/activeactivities')
    .then(res => {
      dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const selectCategory = (id, isSelect) => dispatch => {
  dispatch({
    type: SELECT_CATEGORY,
    payload: { id: id, isSelect: isSelect }
  });
};

export const selectGroup = (id, isSelect) => dispatch => {
  dispatch({
    type: SELECT_GROUP,
    payload: { id: id, isSelect: isSelect }
  });
};
//END ACTIVITIES PAGE
//view Activity
export const getActivityById = id => dispatch => {
  dispatch(startLoading());
  axiosInstance
    .post('/api/activity/activitybyid', { id: id })
    .then(res => {
      dispatch({
        type: ACTIVITY_BY_ID,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
export const SelectOrg = org => dispatch => {
  dispatch({
    type: ACTIVITY_SELECT_ORG,
    payload: org
  });
};
export const deselectOrg = org => dispatch => {
  dispatch({
    type: ACTIVITY_DESELECT_ORG,
    payload: org
  });
};
export const addOrgsToActivity = (activity, orgs) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/addorgs', { activity: activity, orgs: orgs })
    .then(res => {
      dispatch({
        type: ADD_ORG_TO_ACTIVITY,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

//delete org from activity
export const deleteOrg = (activityID, orgID) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/deleteorg', { activity: activityID, org: orgID })
    .then(res => {
      dispatch({
        type: DELETE_ORG_FROM_ACTIVITY,
        payload: orgID
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
/**
 * activity groups
 */
export const SelectGroup = group => dispatch => {
  dispatch({
    type: ACTIVITY_SELECT_GROUP,
    payload: group
  });
};
export const deselectGroup = group => dispatch => {
  dispatch({
    type: ACTIVITY_DESELECT_GROUP,
    payload: group
  });
};
export const addGroupsToActivity = (activity, groups) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/addgroups', { activity: activity, groups: groups })
    .then(res => {
      dispatch({
        type: ADD_GROUP_TO_ACTIVITY,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const deleteGroup = (activityID, groupID) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/deletegroup', { activity: activityID, group: groupID })
    .then(res => {
      dispatch({
        type: DELETE_GROUP_FROM_ACTIVITY,
        payload: groupID
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
/**
 * end activity groups
 */

/**
 * activity categories
 */
export const SelectCategory = category => dispatch => {
  dispatch({
    type: ACTIVITY_SELECT_CATEGORY,
    payload: category
  });
};
export const deselectCategory = category => dispatch => {
  dispatch({
    type: ACTIVITY_DESELECT_CATEGORY,
    payload: category
  });
};
export const addCategoriesToActivity = (activity, categories) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/addcategories', {
      activity: activity,
      categories: categories
    })
    .then(res => {
      dispatch({
        type: ADD_CATEGORY_TO_ACTIVITY,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
export const deleteCategory = (activityID, categoryID) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/deletecategory', {
      activity: activityID,
      category: categoryID
    })
    .then(res => {
      dispatch({
        type: DELETE_CATEGORY_FROM_ACTIVITY,
        payload: categoryID
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
/**
 * end activity category
 */

/**
 * activity places
 */
export const selectPlace = place => dispatch => {
  dispatch({
    type: ACTIVITY_SELECT_PLACE,
    payload: place
  });
};
export const deselectPlace = place => dispatch => {
  dispatch({
    type: ACTIVITY_DESELECT_PLACE,
    payload: place
  });
};
export const addPlacesToActivity = (activity, places) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/addplaces', { activity: activity, places: places })
    .then(res => {
      dispatch({
        type: ADD_PLACE_TO_ACTIVITY,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const deletePlace = (activityID, placeID) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/deleteplace', { activity: activityID, place: placeID })
    .then(res => {
      dispatch({
        type: DELETE_PLACE_FROM_ACTIVITY,
        payload: placeID
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
/**
 * end activity places
 */

/**
 * activity times
 */
export const selectTime = time => dispatch => {
  dispatch({
    type: ACTIVITY_SELECT_TIME,
    payload: time
  });
};
export const deselectTime = time => dispatch => {
  dispatch({
    type: ACTIVITY_DESELECT_TIME,
    payload: time
  });
};
export const addTimesToActivity = data => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/addtime', data)
    .then(res => {
      dispatch({
        type: ADD_TIME_TO_ACTIVITY,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const deleteTime = (activityID, timeID) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/deletetime', { activity: activityID, time: timeID })
    .then(res => {
      dispatch({
        type: DELETE_TIME_FROM_ACTIVITY,
        payload: timeID
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
export const getDays = () => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .get('/api/activity/alldays')
    .then(res => {
      dispatch({
        type: GET_ALL_DAYS,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
/**
 * end activity times
 */
export const addNewImage = imageData => dispatch => {
  dispatch(startLoading());
  const formData = new FormData();
  formData.set('title', imageData.title);
  formData.set('description', imageData.description);
  formData.append('path', imageData.path);
  formData.append('activity_id', imageData.activity_id);

  axiosInstance
    .post('/api/activity/addimage', formData)
    .then(res => {
      dispatch({
        type: ADD_NEW_IMAGE,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
export const deleteActivityImage = id => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/deleteimage', { id: id })
    .then(res => {
      dispatch({
        type: DELETE_IMAGE_FROM_ACTIVITY,
        payload: id
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
/**
 * Activity Contacts
 */
export const addNewContact = data => dispatch => {
  dispatch(startLoading());
  const formData = new FormData();
  formData.set('name', data.name);
  formData.set('email', data.email);
  formData.append('tel', data.tel);
  formData.append('image', data.logo);
  formData.append('activity_id', data.activity_id);

  axiosInstance
    .post('/api/activity/addcontact', formData)
    .then(res => {
      dispatch({
        type: ADD_NEW_CONTACT,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const deleteContact = (activityID, contact) => dispatch => {
  dispatch(startLoading);
  axiosInstance
    .post('/api/activity/deletecontact', {
      activity: activityID,
      contact: contact
    })
    .then(res => {
      dispatch({
        type: DELETE_CONTACT_FROM_ACTIVITY,
        payload: contact
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const SelectContact = contact => dispatch => {
  dispatch({
    type: ACTIVITY_SELECT_CONTACT,
    payload: contact
  });
};
export const deselectContact = contact => dispatch => {
  dispatch({
    type: ACTIVITY_DESELECT_CONTACT,
    payload: contact
  });
};
export const getAllContacts = () => dispatch => {
  dispatch(startLoading());
  axiosInstance
    .get('/api/activity/allcontacts')
    .then(res => {
      dispatch({
        type: GET_ALL_CONTACTS,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const addExistedContacts = (activity, contacts) => dispatch => {
  dispatch(startLoading());

  axiosInstance
    .post('/api/activity/addexistcontacts', {
      activity: activity,
      contacts: contacts
    })
    .then(res => {
      dispatch({
        type: ADD_EXIST_CONTACTS,
        payload: contacts
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const activiateMember = (activity, member, isActive) => dispatch => {
  dispatch(startLoading());

  axiosInstance
    .post('/api/activity/activatemember', {
      activity: activity,
      member: member,
      is_active: isActive
    })
    .then(res => {
      dispatch({
        type: ACTIVITY_ACTIVATE_MEMBER,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const getAllImages = () => dispatch => {
  dispatch(startLoading());

  axiosInstance
    .get('/api/activity/images')
    .then(res => {
      dispatch({
        type: GET_ALL_IMAGES,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
      dispatch(getErrors(err.response.data));
    });
};
