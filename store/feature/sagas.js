import { call, put, takeLatest } from "redux-saga/effects";
import { get, post, put as update } from "../../helpers/axios";
import {
  addFeatureFailed,
  addFeatureSuccess,
  getFeaturesFailed,
  getFeaturesSuccess,
  updateFeatureFailed,
  updateFeatureSuccess,
} from "./actions";
import { ADD_FEATURE, GET_FEATURES, UPDATE_FEATURE } from "./actionTypes";

// get features list
function* getFeaturesList({ data }) {
  try {
    const response = yield call(get, "/feature", { params: data });
    yield put(getFeaturesSuccess(response.data));
  } catch (error) {
    yield put(getFeaturesFailed(error));
  }
}

// add feature
function* addFeature({ data }) {
  try {
    yield call(post, "/feature", data);
    yield put(addFeatureSuccess());
  } catch (error) {
    yield put(addFeatureFailed(error));
  }
}

// update feature
function* updateFeature({ data }) {
  try {
    yield call(update, "/feature", data);
    yield put(updateFeatureSuccess());
  } catch (error) {
    yield put(updateFeatureFailed(error));
  }
}

function* featureSaga() {
  yield takeLatest(GET_FEATURES, getFeaturesList);
  yield takeLatest(ADD_FEATURE, addFeature);
  yield takeLatest(UPDATE_FEATURE, updateFeature);
}

export default featureSaga;
