import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";

// Persist config for user slice
const persistConfig = {
  key: "user",
  storage,
};

// Wrap user reducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const appStore = configureStore({
  reducer: {
    user: persistedUserReducer, // Use persisted reducer for user
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export const persistor = persistStore(appStore);
export default appStore;
