import { call, put, takeLatest } from "redux-saga/effects";
import { del, get, post } from "../../helpers/axios";
import {
  addBookingFailed,
  addBookingSuccess,
  deleteBookingFailed,
  deleteBookingSuccess,
  getBookingFailed,
  getBookingSuccess,
} from "./actions";
import { ADD_BOOKING, DELETE_BOOKING, GET_BOOKINGS } from "./actionTypes";

// get booking list
function* getBookingList({ data }) {
  try {
    const response = yield call(
      get,
      `/bookings?page=${data.page}&limit=${data.limit}`
    );
    yield put(getBookingSuccess(response.data));
  } catch (error) {
    yield put(getBookingFailed(error));
  }
}

// add booking
function* addBooking({ data }) {
  try {
    const response = yield call(post, "/bookings", data);
    yield put(addBookingSuccess(response.bookings));
  } catch (error) {
    yield put(addBookingFailed(error));
  }
}

// delete booking
function* deleteBookingById({ id }) {
  try {
    const response = yield call(del, `/bookings/${id}`);
    yield put(deleteBookingSuccess());
  } catch (error) {
    yield put(deleteBookingFailed(error));
  }
}

function* bookingSaga() {
  yield takeLatest(GET_BOOKINGS, getBookingList);
  yield takeLatest(ADD_BOOKING, addBooking);
  yield takeLatest(DELETE_BOOKING, deleteBookingById);
}

export default bookingSaga;
