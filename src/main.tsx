import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store/index.tsx';
import './api/mock.jsx';
import { Spin } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Spin tip="加载中..." size="large" fullscreen />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </StrictMode>,
);
