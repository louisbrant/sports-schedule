import NotifyService from "../../shared/notify-service";
import {
  ADD_BOOKING,
  ADD_BOOKING_FAILED,
  ADD_BOOKING_SUCCESS,
  DELETE_BOOKING,
  DELETE_BOOKING_FAILED,
  GET_BOOKINGS,
  GET_BOOKINGS_FAILED,
  GET_BOOKINGS_SUCCESS,
  RESET_SUCCESS_STATUS,
} from "./actionTypes";

// reset success status
export const resetSuccessStatus = () => {
  return {
    type: RESET_SUCCESS_STATUS,
  };
};

// get booking list
export const getBookings = (page, limit) => {
  return {
    type: GET_BOOKINGS,
    data: { page, limit },
  };
};

// get booking list successs
export const getBookingSuccess = (data) => {
  return {
    type: GET_BOOKINGS_SUCCESS,
    payload: data,
  };
};

// get booking list failed
export const getBookingFailed = (error) => {
  return {
    type: GET_BOOKINGS_FAILED,
    payload: error,
  };
};

// add booking
export const addBooking = (data) => {
  return {
    type: ADD_BOOKING,
    data,
  };
};

// add booking success
export const addBookingSuccess = (bookings) => {
  // success message
  NotifyService.success("Booking done successfully !");

  return {
    type: ADD_BOOKING_SUCCESS,
    payload: bookings,
  };
};

// add booking failed
export const addBookingFailed = (error) => {
  NotifyService.fail("Something wrong !");

  return {
    type: ADD_BOOKING_FAILED,
    payload: error,
  };
};

// delete booking
export const deleteBooking = (id) => {
  return {
    type: DELETE_BOOKING,
    id,
  };
};

// delete booking success
export const deleteBookingSuccess = () => {
  // success message
  NotifyService.success("Booking deleted successfully !");

  return {
    type: GET_BOOKINGS,
    data: { page: 1, limit: 10 },
  };
};

// delete booking failed
export const deleteBookingFailed = (error) => {
  return {
    type: DELETE_BOOKING_FAILED,
    payload: error,
  };
};
