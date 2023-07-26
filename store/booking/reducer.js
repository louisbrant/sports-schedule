import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_BOOKING_FAILED,
  ADD_BOOKING_SUCCESS,
  GET_BOOKINGS_FAILED,
  GET_BOOKINGS_SUCCESS,
  RESET_SUCCESS_STATUS,
} from "./actionTypes";

const initialState = {
  bookings: [],
  totalBookings: 0,
  errors: null,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.booking;
      break;

    case RESET_SUCCESS_STATUS:
      state = {
        ...state,
        success: false,
      };
      break;

    case GET_BOOKINGS_SUCCESS:
      state = {
        ...state,
        bookings: action.payload.bookings,
        totalBookings: action.payload.totalRecords,
      };
      break;

    case GET_BOOKINGS_FAILED:
      state = {
        ...state,
        errors: action.payload,
      };
      break;

    case ADD_BOOKING_SUCCESS:
      state = {
        ...state,
        bookings: action.payload,
        errors: null,
        success: true,
      };
      break;

    case ADD_BOOKING_FAILED:
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
