import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./Slices/app";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  //whitelist: [],
  //blacklist: []
};

const rootReducer = combineReducers({
  app: appReducer,
});

export { rootPersistConfig, rootReducer };
