import logicStore from "@/features/Logic/logicSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    logicStore,
  },
});
