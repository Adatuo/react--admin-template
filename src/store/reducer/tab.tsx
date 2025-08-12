import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TabItem {
  path: string;
  name: string;
  label: string;
  // icon:"HomeOutlined" //或许这里能够在后来的版本里面根据不同和的用户设定不同的icon
}

interface TabState {
  isCollapse: boolean;
  tabsList: TabItem[];
  currentTag: TabItem;
}

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    isCollapse: false,
    //tagList
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
      },
    ],
    currentTag: { path: '/', name: 'home', label: '首页' },
  } as TabState,
  reducers: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenuList: (state, { payload: val }: PayloadAction<TabItem>) => {
      //action的type&payload
      state.currentTag = val;
      if (val.name !== 'home') {
        const index = state.tabsList.findIndex((item) => item.name === val.name);
        if (index === -1) {
          state.tabsList.push(val);
        }
      }
    },
    closeTag: (state, { payload: tag }: PayloadAction<TabItem>) => {
      const index = state.tabsList.findIndex((item) => item.name === tag.name);
      state.tabsList.splice(index, 1);
    },
    setCurrentTag: (state, { payload: tag }: PayloadAction<TabItem>) => {
      state.currentTag = tag;
    },
  },
});

export const { collapseMenu, selectMenuList, closeTag, setCurrentTag } = tabSlice.actions;
export default tabSlice.reducer;
