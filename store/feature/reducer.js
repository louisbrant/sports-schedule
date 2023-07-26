import { HYDRATE } from "next-redux-wrapper";
import {
  GET_FEATURES_SUCCESS,
  GET_FEATURES_FAILED,
  ADD_FEATURE_SUCCESS,
} from "./actionTypes";

const initialState = {
  totalResults: 0,
  features: [],
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.feature;
      break;

    case GET_FEATURES_SUCCESS:
      state = {
        ...state,
        features: action.payload.features,
        totalResults: action.payload.totalRecords,
      };
      break;

    case GET_FEATURES_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case ADD_FEATURE_SUCCESS:
      state = {
        ...state,
        errors: {},
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};
