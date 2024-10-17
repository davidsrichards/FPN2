import { combineReducers, configureStore } from "@reduxjs/toolkit";
import admissionSlice from '../Features/admissionSlice.js'
import adminSlice from '../Features/adminSlice.js'
import downloadSlice from '../Features/download.js'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedConfig = {
  version: 1,
  key: "root",
  storage,
}
const rootReducers = combineReducers({
  admin: adminSlice,
  admissionSlice: admissionSlice,
  downloadSlice: downloadSlice,
 
});

const persistedReducer = persistReducer(persistedConfig, rootReducers);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getMiddleware) => getMiddleware({
    serializableCheck: false,
  })
});
