import React from 'react';
import { Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { closeTag, setCurrentMenu } from '../../store/reducer/tab';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import type { TabItem } from '../../typings/store/tab';

export const Tags: React.FC = () => {
  const tableList = useSelector((state: RootState) => state.tab.tableList);
  const currentMenu = useSelector((state: RootState) => state.tab.currentMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handle = (tag: TabItem) => {
    navigate(tag.path);
    dispatch(setCurrentMenu(tag));
  };

  const close = (tag: TabItem, index: number) => {
    dispatch(closeTag(tag));

    if (tag.path !== location.pathname) {
      return;
    }
    if (index === tableList.length - 1) {
      navigate(tableList[index - 1].path);
      dispatch(setCurrentMenu(tableList[index - 1]));
    } else if (tableList.length > 1) {
      navigate(tableList[index + 1].path);
      dispatch(setCurrentMenu(tableList[index + 1]));
    }
  };

  return (
    <div className="tags">
      {tableList.map((tag: TabItem, index: number) => {
        return (
          <div className="common-tag" key={tag.path}>
            <Tag
              closable={tag.name !== '首页'}
              onClose={() => close(tag, index)}
              onClick={() => handle(tag)}
              style={currentMenu?.path === tag.path ? { color: '#55acee' } : undefined}
            >
              {tag.name}
            </Tag>
          </div>
        );
      })}
    </div>
  );
};