import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TabItem, TabState } from '../../typings/store/tab';

const initialState: TabState = {
  isCollapse: false,
  tableList: [{ path: '/home', name: '首页' }],
  currentMenu: { path: '/home', name: '首页' },
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    setCurrentMenu(state, action: PayloadAction<TabItem>) {
      state.currentMenu = action.payload;
    },
    selectMenus(state, action: PayloadAction<TabItem>) {
      if (state.tableList.findIndex((item) => item.name === action.payload.name) === -1) {
        state.tableList.push(action.payload);
      }
    },
    closeTag(state, action: PayloadAction<TabItem>) {
      const index = state.tableList.findIndex((item) => item.name === action.payload.name);
      if (index !== -1) {
        state.tableList.splice(index, 1);
      }
    },
  },
});

export const { collapseMenu, selectMenus, setCurrentMenu, closeTag } = tabSlice.actions;
export default tabSlice.reducer;