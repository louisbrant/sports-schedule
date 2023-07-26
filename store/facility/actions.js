import {
  DELETE_FACILITY,
  DELETE_FACILITY_FAILED,
  DELETE_FACILITY_SUCCESS,
  GET_ADDED_FACILITIES,
  GET_ADDED_FACILITIES_FAILED,
  GET_ADDED_FACILITIES_SUCCESS,
  GET_FACILITIES,
  GET_FACILITIES_BY_SPORT_ID,
  GET_FACILITIES_BY_SPORT_ID_FAILED,
  GET_FACILITIES_BY_SPORT_ID_SUCCESS,
  GET_FACILITIES_FAILED,
  GET_FACILITIES_SUCCESS,
  GET_FACILITY_BY_ID,
  GET_FACILITY_BY_ID_FAILED,
  GET_FACILITY_BY_ID_SUCCESS,
  GET_FACILITY_BY_NAME,
  GET_FACILITY_BY_NAME_FAILED,
  GET_FACILITY_BY_NAME_SUCCESS,
  SEARCH_FACILITIES,
  SEARCH_FACILITIES_FAILED,
  SEARCH_FACILITIES_SUCCESS,
} from "./actionTypes";

// get facilities list
export const getFacilities = () => {
  return {
    type: GET_FACILITIES,
  };
};

// get facility list successs
export const getFacilitiesSuccess = (data) => {
  return {
    type: GET_FACILITIES_SUCCESS,
    payload: data,
  };
};

// get facility list failed
export const getFacilitiesFailed = (error) => {
  return {
    type: GET_FACILITIES_FAILED,
    payload: error,
  };
};

// get added facilities list
export const getAddedFacilities = (page, limit) => {
  return {
    type: GET_ADDED_FACILITIES,
    data: { page, limit },
  };
};

// get added facility list successs
export const getAddedFacilitiesSuccess = (data) => {
  return {
    type: GET_ADDED_FACILITIES_SUCCESS,
    payload: data,
  };
};

// get added facility list failed
export const getAddedFacilitiesFailed = (error) => {
  return {
    type: GET_ADDED_FACILITIES_FAILED,
    payload: error,
  };
};

// get facility by id
export const getFacilityById = (id) => {
  return {
    type: GET_FACILITY_BY_ID,
    id,
  };
};

// get facility by id successs
export const getFacilityByIdSuccess = (data) => {
  return {
    type: GET_FACILITY_BY_ID_SUCCESS,
    payload: data,
  };
};

// get facility by id failed
export const getFacilityByIdFailed = (error) => {
  return {
    type: GET_FACILITY_BY_ID_FAILED,
    payload: error,
  };
};

// get facility by name
export const getFacilityByName = (name) => {
  return {
    type: GET_FACILITY_BY_NAME,
    name,
  };
};

// get facility by name successs
export const getFacilityByNameSuccess = (data) => {
  return {
    type: GET_FACILITY_BY_NAME_SUCCESS,
    payload: data,
  };
};

// get facility by name failed
export const getFacilityByNameFailed = (error) => {
  return {
    type: GET_FACILITY_BY_NAME_FAILED,
    payload: error,
  };
};

// get facility by sport id
export const getFacilitiesBySportId = (id) => {
  return {
    type: GET_FACILITIES_BY_SPORT_ID,
    id,
  };
};

// get facility by sport id successs
export const getFacilitiesBySportIdSuccess = (data) => {
  return {
    type: GET_FACILITIES_BY_SPORT_ID_SUCCESS,
    payload: data,
  };
};

// get facility by sport id failed
export const getFacilitiesBySportIdFailed = (error) => {
  return {
    type: GET_FACILITIES_BY_SPORT_ID_FAILED,
    payload: error,
  };
};

// search facilities
export const searchFacilities = (payload) => {
  return {
    type: SEARCH_FACILITIES,
    payload,
  };
};

// search facilities successs
export const searchFacilitiesSuccess = (data) => {
  return {
    type: SEARCH_FACILITIES_SUCCESS,
    payload: data,
  };
};

// search facility list failed
export const searchFacilitiesFailed = (error) => {
  return {
    type: SEARCH_FACILITIES_FAILED,
    payload: error,
  };
};

// delete facility
export const deleteFacility = (id) => {
  return {
    type: DELETE_FACILITY,
    id,
  };
};

// delete facility success
export const deleteFacilitySuccess = () => {
  return {
    type: GET_ADDED_FACILITIES,
    data: {page: 1, limit: 10}
  };
};

// delete facility failed
export const deleteFacilityFailed = (error) => {
  return {
    type: DELETE_FACILITY_FAILED,
    payload: error,
  };
};
