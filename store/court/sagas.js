import { call, put, takeLatest } from "redux-saga/effects";
import { get, del } from "../../helpers/axios";
import {
  deleteCourtFailed,
  deleteCourtSuccess,
  getCourtsByFacilityAndSportsFailed,
  getCourtsByFacilityAndSportsSuccess,
  getCourtsByFacilityFailed,
  getCourtsByFacilitySuccess,
  getCourtsFailed,
  getCourtsSuccess,
} from "./actions";
import {
  DELETE_COURT,
  GET_COURTS,
  GET_COURTS_BY_FACILITY,
  GET_COURTS_BY_FACILITY_AND_SPORTS,
} from "./actionTypes";

// get courts list
function* getCourtsList() {
  try {
    const response = yield call(get, "/courts");
    yield put(getCourtsSuccess(response.data));
  } catch (error) {
    yield put(getCourtsFailed(error));
  }
}

// get courts by facility
function* getCourtsByFacility({ data }) {
  console.log("DATA =======32", data)
  try {
    const response = yield call(get, `/courts/facility/${data.id}`, {
      params: { page: data.page, limit: data.limit },
    });
    yield put(getCourtsByFacilitySuccess(response.courts));
  } catch (error) {
    yield put(getCourtsByFacilityFailed(error));
  }
}

// get courts by facility and sport
function* getCourtsByFacilityAndSport({ facilityId, sportId }) {
  try {
    const response = yield call(
      get,
      `/facilities/id-sport/${facilityId}/${sportId}`
    );
    yield put(getCourtsByFacilityAndSportsSuccess(response.courts));
  } catch (error) {
    yield put(getCourtsByFacilityAndSportsFailed(error));
  }
}

// delete court
function* deleteCourt({payload}) {
  console.log('payload =====>', payload)
  const {id, facilityId} = payload;
  try {
    yield call(del, `/courts/${id}`);
    const response = yield put(deleteCourtSuccess(facilityId));
    console.log('response =====>', response)
    
  } catch (error) {
    yield put(deleteCourtFailed(error));
  }
}

function* sportsSaga() {
  yield takeLatest(GET_COURTS, getCourtsList);
  yield takeLatest(GET_COURTS_BY_FACILITY, getCourtsByFacility);
  yield takeLatest(
    GET_COURTS_BY_FACILITY_AND_SPORTS,
    getCourtsByFacilityAndSport
  );
  yield takeLatest(DELETE_COURT, deleteCourt);
}

export default sportsSaga;
