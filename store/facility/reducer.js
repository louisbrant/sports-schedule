import { HYDRATE } from "next-redux-wrapper";
import {
  GET_ADDED_FACILITIES_FAILED,
  GET_ADDED_FACILITIES_SUCCESS,
  GET_FACILITIES_BY_SPORT_ID_FAILED,
  GET_FACILITIES_BY_SPORT_ID_SUCCESS,
  GET_FACILITIES_FAILED,
  GET_FACILITIES_SUCCESS,
  GET_FACILITY_BY_ID_FAILED,
  GET_FACILITY_BY_ID_SUCCESS,
  GET_FACILITY_BY_NAME_FAILED,
  GET_FACILITY_BY_NAME_SUCCESS,
  SEARCH_FACILITIES_FAILED,
  SEARCH_FACILITIES_SUCCESS,
} from "./actionTypes";

const initialState = {
  facilities: [],
  facility: {},
  totalRecords: 0,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.facility;
      break;

    case GET_FACILITIES_SUCCESS:
      state = {
        ...state,
        facilities: action.payload,
      };
      break;

    case GET_FACILITIES_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case SEARCH_FACILITIES_SUCCESS:
      state = {
        ...state,
        facilities: action.payload.facilities,
        totalRecords: action.payload.totalRecords,
      };
      break;

    case SEARCH_FACILITIES_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case GET_ADDED_FACILITIES_SUCCESS:
      state = {
        ...state,
        facilities: action.payload.facilities,
        totalRecords: action.payload.totalRecords,
      };
      break;

    case GET_ADDED_FACILITIES_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case GET_FACILITY_BY_ID_SUCCESS:
      state = {
        ...state,
        facility: action.payload,
      };
      break;

    case GET_FACILITY_BY_ID_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case GET_FACILITY_BY_NAME_SUCCESS:
      state = {
        ...state,
        facility: action.payload,
      };
      break;

    case GET_FACILITY_BY_NAME_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case GET_FACILITIES_BY_SPORT_ID_SUCCESS:
      state = {
        ...state,
        facilities: action.payload,
      };
      break;

    case GET_FACILITIES_BY_SPORT_ID_FAILED:
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
