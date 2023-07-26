import { HYDRATE } from "next-redux-wrapper";
import {
  GET_COURTS_BY_FACILITY_AND_SPORTS_FAILED,
  GET_COURTS_BY_FACILITY_AND_SPORTS_SUCCESS,
  GET_COURTS_BY_FACILITY_FAILED,
  GET_COURTS_BY_FACILITY_SUCCESS,
  GET_COURTS_FAILED,
  GET_COURTS_SUCCESS,
} from "./actionTypes";

const initialState = {
  courts: [],
  totalResults: 0,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.court;
      break;

    case GET_COURTS_SUCCESS:
      state = {
        ...state,
        courts: action.payload,
      };
      break;

    case GET_COURTS_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case GET_COURTS_BY_FACILITY_SUCCESS:
      state = {
        ...state,
        courts: action.payload,
        totalResults: 0,
      };
      break;

    case GET_COURTS_BY_FACILITY_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case GET_COURTS_BY_FACILITY_AND_SPORTS_SUCCESS:
      state = {
        ...state,
        courts: action.payload,
      };
      break;

    case GET_COURTS_BY_FACILITY_AND_SPORTS_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};
