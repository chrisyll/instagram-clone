import { configureStore } from "@reduxjs/toolkit";
import reducer from "./accountSlice";

const store = configureStore({
  reducer: {
    account: reducer,
  },
});

export { store };
