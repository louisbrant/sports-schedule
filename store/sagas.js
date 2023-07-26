import { all, fork } from "redux-saga/effects";

// sport saga
import SportSaga from "./sport/sagas";
// facility saga
import FacilitySaga from "./facility/sagas";
// feature saga
import FeatureSaga from "./feature/sagas";
// court saga
import CourtSaga from "./court/sagas";
// booking saga
import BookingSaga from "./booking/sagas";

export default function* rootSaga() {
  yield all([fork(SportSaga)]);
  yield all([fork(FacilitySaga)]);
  yield all([fork(FeatureSaga)]);
  yield all([fork(CourtSaga)]);
  yield all([fork(BookingSaga)]);
}
