import { createBrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Learn from './pages/Learn.jsx';
import ProgressPage from './pages/Progress.jsx';
import SubTopicDetail from './pages/SubTopicDetail.jsx';
import PublicProfile from './pages/PublicProfile.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <Auth /> },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/learn', element: <Learn /> },
  { path: '/progress', element: <ProgressPage /> },
  { path: '/progress/:topicId', element: <SubTopicDetail /> },
  { path: '/profile/:displayName', element: <PublicProfile /> },
]);
