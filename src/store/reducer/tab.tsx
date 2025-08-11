import { createSlice } from '@reduxjs/toolkit';

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
        // icon:"HomeOutlined" //或许这里能够在后来的版本里面根据不同和的用户设定不同的icon
      },
    ],
    currentTag: { path: '/', name: 'home', label: '首页' }, 
  },
  reducers: {
    collapseMenu(state) {
      //传参的action暂时用不上
      state.isCollapse = !state.isCollapse;
    },
    selectMenuList: (state, { payload: val }) => {
      //action的type&payload
      state.currentTag = val;
      if (val.name !== 'home') {
        const index = state.tabsList.findIndex((item) => item.name === val.name);
        if (index === -1) {
          state.tabsList.push(val);
        }
      } else if (val.name === 'home' && state.tabsList.length === 1) {
        state.currentTag = {};
      }
    },
    closeTag: (state, { payload: tag }) => {
      const index = state.tabsList.findIndex((item) => item.name === tag.name);
      state.tabsList.splice(index, 1);
    },
    setCurrentTag: (state, { payload: tag }) => {
      state.currentTag = tag;
    },
  },
});

export const { collapseMenu, selectMenuList, closeTag, setCurrentTag } = tabSlice.actions;
export default tabSlice.reducer;
