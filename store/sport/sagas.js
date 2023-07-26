import { call, put, takeLatest } from "redux-saga/effects";
import { get, post, put as update } from "../../helpers/axios";
import {
  addSportFailed,
  addSportSuccess,
  getSportsFailed,
  getSportsSuccess,
  updateSportFailed,
  updateSportSuccess,
} from "./actions";
import { ADD_SPORT, GET_SPORTS, UPDATE_SPORT } from "./actionTypes";

// get sports list
function* getSportsList({ data }) {
  try {
    const response = yield call(get, "/sports", { params: data });
    yield put(getSportsSuccess(response.data));
  } catch (error) {
    yield put(getSportsFailed(error));
  }
}

// add sport
function* addSport({ data }) {
  try {
    yield call(post, "/sports", data);
    yield put(addSportSuccess());
  } catch (error) {
    yield put(addSportFailed(error));
  }
}

// update sport
function* updateSport({ data }) {
  try {
    yield call(update, "/sports", data);
    yield put(updateSportSuccess());
  } catch (error) {
    yield put(updateSportFailed(error));
  }
}

function* sportsSaga() {
  yield takeLatest(GET_SPORTS, getSportsList);
  yield takeLatest(ADD_SPORT, addSport);
  yield takeLatest(UPDATE_SPORT, updateSport);
}

export default sportsSaga;
