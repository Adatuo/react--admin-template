import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    isCollapse: false,
    tableList: [{ path: '/home', name: '首页' }],
    currentMenu: [{ path: '/home', name: '首页' }],
  },
  reducers: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    setCurrentMenu(state, { payload: val }) {
      state.currentMenu = val;
    },
    selectMenus(state, { payload: val }) {
      if (state.tableList.findIndex((item) => item.name === val.name) === -1) {
        state.tableList.push(val);
      }
    },
    closeTag(state, { payload: val }) {
      const index = state.tableList.findIndex((item) => item.name === val.name);
      if (index !== -1) {
        state.tableList.splice(index, 1);
      }
    },
  },
});
export const { collapseMenu, selectMenus, setCurrentMenu, closeTag } = tabSlice.actions;
export default tabSlice;
