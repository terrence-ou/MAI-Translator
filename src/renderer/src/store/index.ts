import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "@/store/settingsSlice";
import translationConfigReducer from "@/store/translationConfigSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    translationConfig: translationConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
