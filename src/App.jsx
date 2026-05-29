import './App.css';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import FightPage from './pages/FightPage';
import HomePage from './pages/HomePage';
import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';
import DashLayout from './layouts/DashLayout';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

const DashboardIndex = () => {
  const userType = typeof window !== 'undefined' ? localStorage.getItem('type') : null;

  if (!userType) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (userType === 'editor') {
    return <Navigate to="reports" replace />;
  }

  return <Navigate to="users" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />,
      },
      {
        path: 'fights/:slug',
        element: <FightPage />,
      },
      {
        path: 'notfound',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashLayout />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'articles',
        element: <DashArticleListPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
