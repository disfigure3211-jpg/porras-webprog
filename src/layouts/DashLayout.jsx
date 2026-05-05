import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { text: 'Dashboard', to: '/dashboard' },
  { text: 'Reports', to: '/dashboard/reports' },
  { text: 'Users', to: '/dashboard/users' },
];

const DashLayout = () => {
  const location = useLocation();
  const pageTitle = navItems.find((item) => location.pathname.startsWith(item.to))?.text || 'Dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-50 to-slate-100 text-slate-900">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-down {
          animation: slideDown 0.4s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-lg animate-slide-down">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg" />
              <div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300 font-semibold">Admin panel</p>
              <h1 className="text-lg font-bold tracking-tight">{pageTitle}</h1>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <input
              type="search"
              placeholder="Search..."
              className="w-full max-w-xs rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 hover:border-slate-500"
            />
            <Link
              to="/auth/signin"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:shadow-cyan-500/50 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col md:flex-row gap-6">
        <aside className="w-full border-b border-slate-300 bg-white/70 backdrop-blur text-slate-900 shadow-sm md:w-72 md:border-b-0 md:border-r md:pb-10 md:sticky md:top-[72px] md:h-fit">
          <div className="px-4 py-6">
            <h2 className="mb-4 text-xs uppercase tracking-[0.4em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Navigation</h2>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 transform ${
                      active 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:translate-x-1'
                    }`}
                  >
                    {item.text}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
