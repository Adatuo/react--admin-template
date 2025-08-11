import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "./reducer/tab";


const store = configureStore({
  reducer:{
    tab:tabSlice
  },
})
//useSelector的state类型
export type RootState = ReturnType<typeof store.getState>;
export default store;