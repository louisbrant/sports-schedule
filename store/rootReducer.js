import { combineReducers } from "redux";

import sportsReducer from "./sport/reducer"; // sport reducer
import facilityReducer from "./facility/reducer"; // facility reducer
import featureReducer from "./feature/reducer"; // feature reducer
import courtReducer from "./court/reducer"; // court reducer
import bookingReducer from "./booking/reducer"; // booking reducer

const rootReducer = combineReducers({
  sport: sportsReducer,
  facility: facilityReducer,
  feature: featureReducer,
  court: courtReducer,
  booking: bookingReducer,
});

export default rootReducer;
