import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_SPORT_SUCCESS,
  GET_SPORTS_FAILED,
  GET_SPORTS_SUCCESS,
} from "./actionTypes";

const initialState = {
  sports: [],
  totalResults: 0,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.sport;
      break;

    case GET_SPORTS_SUCCESS:
      state = {
        ...state,
        sports: action.payload.sportss,
        totalResults: action.payload.totalRecords,
      };
      break;

    case GET_SPORTS_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case ADD_SPORT_SUCCESS:
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
