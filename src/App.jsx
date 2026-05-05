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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
