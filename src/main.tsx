import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="正在加载,请稍后...">
      <App />
    </Suspense>
  </StrictMode>,
);
