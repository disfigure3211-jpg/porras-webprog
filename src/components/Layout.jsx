import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;