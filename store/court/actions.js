import {
  DELETE_COURT,
  DELETE_COURT_FAILED,
  GET_COURTS,
  GET_COURTS_BY_FACILITY,
  GET_COURTS_BY_FACILITY_AND_SPORTS,
  GET_COURTS_BY_FACILITY_AND_SPORTS_FAILED,
  GET_COURTS_BY_FACILITY_AND_SPORTS_SUCCESS,
  GET_COURTS_BY_FACILITY_FAILED,
  GET_COURTS_BY_FACILITY_SUCCESS,
  GET_COURTS_FAILED,
  GET_COURTS_SUCCESS,
} from "./actionTypes";

// get courts list
export const getCourts = () => {
  return {
    type: GET_COURTS,
  };
};

// get courts list successs
export const getCourtsSuccess = (data) => {
  return {
    type: GET_COURTS_SUCCESS,
    payload: data,
  };
};

// get courts list failed
export const getCourtsFailed = (error) => {
  return {
    type: GET_COURTS_FAILED,
    payload: error,
  };
};

// get courts by facility
export const getCourtsByFacility = (id, page, limit) => {
  return {
    type: GET_COURTS_BY_FACILITY,
    data: { id, page, limit },
  };
};

// get courts by facility successs
export const getCourtsByFacilitySuccess = (data) => {
  return {
    type: GET_COURTS_BY_FACILITY_SUCCESS,
    payload: data,
  };
};

// get courts by facility failed
export const getCourtsByFacilityFailed = (error) => {
  return {
    type: GET_COURTS_BY_FACILITY_FAILED,
    payload: error,
  };
};

// get courts by facility and sports
export const getCourtsByFacilityAndSports = (facilityId, sportId) => {
  return {
    type: GET_COURTS_BY_FACILITY_AND_SPORTS,
    facilityId,
    sportId,
  };
};

// get courts by facility and sport success
export const getCourtsByFacilityAndSportsSuccess = (data) => {
  return {
    type: GET_COURTS_BY_FACILITY_AND_SPORTS_SUCCESS,
    payload: data,
  };
};

// get courts by facility and sport failed
export const getCourtsByFacilityAndSportsFailed = (error) => {
  return {
    type: GET_COURTS_BY_FACILITY_AND_SPORTS_FAILED,
    payload: error,
  };
};

// delete court
export const deleteCourt = (id, facilityId) => {
  return {
    type: DELETE_COURT,
    payload: {
      id,
      facilityId,
    }
  };
};

// delete court success
export const deleteCourtSuccess = (id) => {
  return {
    type: GET_COURTS_BY_FACILITY,
    data: {id, page:1, limit:10},
  };
};

// delete court failed
export const deleteCourtFailed = (error) => {
  return {
    type: DELETE_COURT_FAILED,
    payload: error,
  };
};
