import { Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { closeTag, setCurrentMenu } from '../../store/reducer/tab';
import { useNavigate } from 'react-router-dom';

export const Tags = () => {
  const tableList = useSelector((state: RootState) => state.tab.tableList);
  const currentMenu = useSelector((state: RootState) => state.tab.currentMenu);
  const dispatch = useDispatch();
  const navegate = useNavigate();

  const handle = (tag) => {
    navegate(tag.path);
    dispatch(setCurrentMenu(tag));
  };

  const close = (tag, index) => {
    //redux是异步的,更新不会错乱,同步拿到需要useEffect监听
    dispatch(closeTag(tag));

    if (tag.path !== location.pathname) {
      return;
    }
    if (index == tableList.length - 1) {
      navegate(tableList[index - 1].path);
      dispatch(setCurrentMenu(tableList[index - 1]));
    } else if (tableList.length > 1) {
      navegate(tableList[index + 1].path);
      dispatch(setCurrentMenu(tableList[index + 1]));
    }
  };

  return (
    <div className="tags">
      {tableList.map((tag, index) => {
        return (
          <Tag
            key={tag.path}
            closable={tag.name !== '首页'}
            onClose={() => close(tag, index)}
            onClick={() => handle(tag)}
            style={
              currentMenu.path === tag.path ? { color: 'blue', fontWeight: 'bold' } : undefined
            }
          >
            {tag.name}
          </Tag>
        );
      })}
    </div>
  );
};
