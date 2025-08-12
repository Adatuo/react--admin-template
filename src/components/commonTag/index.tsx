import { Space, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import type { RootState } from '../../store';
import './index.scss';
import { closeTag, setCurrentTag } from '../../store/reducer/tab';

const CommonTag: React.FC = () => {
  const currentTag = useSelector((state: RootState) => state.tab.currentTag);
  const tabsList = useSelector((state: RootState) => state.tab.tabsList);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = (tag) => {
    navigate(tag.path);
    dispatch(setCurrentTag(tag));
  };

  //Tag关闭以及切换
  const handleClose = (tag, index) => {
    dispatch(closeTag(tag));
    if (tag.path !== location.pathname) {
      return;
    }
    if (index === tabsList.length - 1) {
      //关闭最后一个标签
      dispatch(setCurrentTag(tabsList[index - 1]));
      navigate(tabsList[index - 1].path);
    } else if (tabsList.length > 1) {
      dispatch(setCurrentTag(tabsList[index + 1]));
      navigate(tabsList[index + 1].path);
    }
  };

  //tag高亮
  const setTag = (flag, item, index) => {
    return (
      <Tag
        color={flag ? '#55acee' : undefined}
        key={item.name}
        closable={item.name !== 'home'}
        onClick={() => handleClick(item)}
        onClose={() => handleClose(item, index)}
        style={{ cursor: 'pointer' }}
      >
        {item.label}
      </Tag>
    );
  };

  return (
    <Space className="common-tag" size={[0, 8]} wrap>
      {tabsList.map((item, index) => setTag(item.path === currentTag.path, item, index))}
    </Space>
  );
};

export default CommonTag;
