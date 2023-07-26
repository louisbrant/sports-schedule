import {
  ADD_SPORT,
  ADD_SPORT_FAILED,
  ADD_SPORT_SUCCESS,
  GET_SPORTS,
  GET_SPORTS_FAILED,
  GET_SPORTS_SUCCESS,
  UPDATE_SPORT,
  UPDATE_SPORT_FAILED,
} from "./actionTypes";
import NotifyService from "../../shared/notify-service";

// get sports list
export const getSports = (page = 1, limit = 1000) => {
  return {
    type: GET_SPORTS,
    data: { page, limit },
  };
};

// get sports list successs
export const getSportsSuccess = (data) => {
  return {
    type: GET_SPORTS_SUCCESS,
    payload: data,
  };
};

// get sports list failed
export const getSportsFailed = (error) => {
  return {
    type: GET_SPORTS_FAILED,
    payload: error,
  };
};

// add sport
export const addSport = (data) => {
  return {
    type: ADD_SPORT,
    data,
  };
};

// add sport successs
export const addSportSuccess = () => {
  NotifyService.success("Sports Saved Successfully!");

  return {
    type: GET_SPORTS,
    data: { page: 1, limit: 10 },
  };
};

// add sport failed
export const addSportFailed = (error) => {
  NotifyService.fail("Sports Not Saved!");

  return {
    type: ADD_SPORT_FAILED,
    payload: error,
  };
};

// update sport
export const updateSport = (data) => {
  return {
    type: UPDATE_SPORT,
    data,
  };
};

// update sport successs
export const updateSportSuccess = () => {
  NotifyService.success("Sports Saved Successfully!");

  return {
    type: GET_SPORTS,
    data: { page: 1, limit: 10 },
  };
};

// update sport failed
export const updateSportFailed = (error) => {
  NotifyService.fail("Sports Not Saved!");

  return {
    type: UPDATE_SPORT_FAILED,
    payload: error,
  };
};
