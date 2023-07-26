import { call, put, takeLatest } from "redux-saga/effects";
import { del, get } from "../../helpers/axios";
import {
  getAddedFacilitiesFailed,
  getAddedFacilitiesSuccess,
  getFacilitiesBySportIdSuccess,
  getFacilitiesBySportIdFailed,
  getFacilitiesFailed,
  getFacilitiesSuccess,
  getFacilityByIdFailed,
  getFacilityByIdSuccess,
  getFacilityByNameFailed,
  getFacilityByNameSuccess,
  searchFacilitiesFailed,
  searchFacilitiesSuccess,
  deleteFacilityFailed,
  deleteFacilitySuccess,
} from "./actions";
import {
  DELETE_FACILITY,
  GET_ADDED_FACILITIES,
  GET_FACILITIES,
  GET_FACILITIES_BY_SPORT_ID,
  GET_FACILITY_BY_ID,
  GET_FACILITY_BY_NAME,
  SEARCH_FACILITIES,
} from "./actionTypes";

// get facilities list
function* getFacilitiesList() {
  try {
    const response = yield call(get, "/facilities/all");
    yield put(getFacilitiesSuccess(response.facilities));
  } catch (error) {
    yield put(getFacilitiesFailed(error));
  }
}

// get added facilities
function* getAddedFacilities({ data }) {
  console.log("DATA ======41", data)
  try {
    const response = yield call(get, "/facilities", { params: data });
    yield put(getAddedFacilitiesSuccess(response.facilities));
  } catch (error) {
    yield put(getAddedFacilitiesFailed(error));
  }
}

// get facility by id
function* getFacilityById({ id }) {
  try {
    const response = yield call(get, `/facilities/${id}`);
    yield put(getFacilityByIdSuccess(response.facility));
  } catch (error) {
    yield put(getFacilityByIdFailed(error));
  }
}

// get facility by name
function* getFacilityByName({ name }) {
  try {
    const response = yield call(get, `/facilities/name/${name}`);
    yield put(getFacilityByNameSuccess(response.facility));
  } catch (error) {
    yield put(getFacilityByNameFailed(error));
  }
}

// get facilities by sport id
function* getFacilitiesBySportId({ id }) {
  try {
    const response = yield call(get, `/facilities/sport/${id}`);
    yield put(getFacilitiesBySportIdSuccess(response.facility));
  } catch (error) {
    yield put(getFacilitiesBySportIdFailed(error));
  }
}

// search facilities
function* searchFacilities({ payload }) {
  try {
    const response = yield call(get, "/search", { params: payload });

    yield put(searchFacilitiesSuccess(response.data));
  } catch (error) {
    yield put(searchFacilitiesFailed(error));
  }
}

// delete facility
function* deleteFacility({ id }) {
  console.log("ID=====92", id)
  try {
    const response = yield call(del, `/facilities/${id}`);
    console.log("RESPONSE=====92", response)
    yield put(deleteFacilitySuccess());
  } catch (error) {
    yield put(deleteFacilityFailed(error));
  }
}

function* facilitiesSaga() {
  yield takeLatest(GET_FACILITIES, getFacilitiesList);
  yield takeLatest(SEARCH_FACILITIES, searchFacilities);
  yield takeLatest(GET_FACILITY_BY_ID, getFacilityById);
  yield takeLatest(GET_FACILITY_BY_NAME, getFacilityByName);
  yield takeLatest(GET_ADDED_FACILITIES, getAddedFacilities);
  yield takeLatest(GET_FACILITIES_BY_SPORT_ID, getFacilitiesBySportId);
  yield takeLatest(DELETE_FACILITY, deleteFacility);
}

export default facilitiesSaga;
