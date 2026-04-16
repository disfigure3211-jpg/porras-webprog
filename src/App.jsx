import './App.css';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import FightPage from './pages/FightPage';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

const routes = [{
  path: '/',
  element: <Layout />,
  // Error element
  errorElement: <NotFoundPage />,
  children: [{
    index: true,
    element: <HomePage />
  },
  {
    path: 'about',
    element: <AboutPage />
  },
  {
    path: 'articles',
    element: <ArticleListPage />
  },
  {
    path: 'articles/:name',
    element: <ArticlePage />
  },
  {
    path: 'fights/:slug',
    element: <FightPage />
  },
  {
    path: 'notfound',
    element: <NotFoundPage />
  }
  ]
}]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;