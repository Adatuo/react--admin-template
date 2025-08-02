import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux'
import store from './store/index.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="正在加载,请稍后...">
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </StrictMode>,
);
