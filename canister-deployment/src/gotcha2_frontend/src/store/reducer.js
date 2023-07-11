import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import snackbarReducer from "./snackbarReducer";
import accountReducer from "./accountReducer";

const rootReducer = combineReducers({
  account: accountReducer,
  customization: customizationReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
