import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "./reducer/tab";

//useSelector的state类型
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer:{
    tab:tabSlice.reducer
  },
})
export default store;