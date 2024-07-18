import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "@/store/settingsSlice";
import translationConfigReducer from "@/store/translationConfigSlice";
import filesReducer from "@/store/filesSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    translationConfig: translationConfigReducer,
    files: filesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
