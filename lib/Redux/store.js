import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import usersReducer from "@/lib/Redux/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersReducer,
  },
});
