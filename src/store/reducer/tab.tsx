import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name:"tab",
  initialState:{
    isCollapse:false,
  },
  reducers:{
    collapseMenu(state){//传参的action暂时用不上
      state.isCollapse = !state.isCollapse;
    }
  }
})
export const { collapseMenu } = tabSlice.actions;
export default tabSlice