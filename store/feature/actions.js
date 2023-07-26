import NotifyService from "../../shared/notify-service";
import {
  ADD_FEATURE,
  ADD_FEATURE_FAILED,
  ADD_FEATURE_SUCCESS,
  GET_FEATURES,
  GET_FEATURES_FAILED,
  GET_FEATURES_SUCCESS,
  UPDATE_FEATURE,
  UPDATE_FEATURE_FAILED,
} from "./actionTypes";

// get features list
export const getFeatures = (page = 1, limit = 1000) => {
  return {
    type: GET_FEATURES,
    data: { page, limit },
  };
};

// get features list successs
export const getFeaturesSuccess = (data) => {
  return {
    type: GET_FEATURES_SUCCESS,
    payload: data,
  };
};

// get features list failed
export const getFeaturesFailed = (error) => {
  return {
    type: GET_FEATURES_FAILED,
    payload: error,
  };
};

// add feature
export const addFeature = (data) => {
  return {
    type: ADD_FEATURE,
    data,
  };
};

// add feature successs
export const addFeatureSuccess = () => {
  NotifyService.success("Feature Saved Successfully!");

  return {
    type: GET_FEATURES,
    data: { page: 1, limit: 10 },
  };
};

// add feature failed
export const addFeatureFailed = (error) => {
  NotifyService.fail("Feature Not Saved!");

  return {
    type: ADD_FEATURE_FAILED,
    payload: error,
  };
};

// update feature
export const updateFeature = (data) => {
  return {
    type: UPDATE_FEATURE,
    data,
  };
};

// update feature successs
export const updateFeatureSuccess = () => {
  NotifyService.success("Feature Saved Successfully!");

  return {
    type: GET_FEATURES,
    data: { page: 1, limit: 10 },
  };
};

// update feature failed
export const updateFeatureFailed = (error) => {
  NotifyService.fail("Feature Not Saved!");

  return {
    type: UPDATE_FEATURE_FAILED,
    payload: error,
  };
};
