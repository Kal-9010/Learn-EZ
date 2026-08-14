import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router.jsx';
import { AppProviders } from './context/AppProviders.jsx';
import MayaChatButton from './components/maya/MayaChatButton.jsx';
import MayaChatPanel from './components/maya/MayaChatPanel.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
      <MayaChatButton />
      <MayaChatPanel />
    </AppProviders>
  </StrictMode>
);
