import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { forceReducerReload } from "redux-injectors";
import logger from "redux-logger";

import { createReducer } from "./reducers";

export function configureAppStore() {
  const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(logger),
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== "production" ||
      process.env.PUBLIC_URL.length > 0,
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept("./reducers", () => {
      forceReducerReload(store);
    });
  }

  return store;
}

export type AppStore = ReturnType<typeof configureAppStore>;

export const wrapper = createWrapper<AppStore>(configureAppStore);
