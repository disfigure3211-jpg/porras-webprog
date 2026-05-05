import { userRows } from './dashboardData';

const UsersPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rowSlide {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-row-slide {
          animation: rowSlide 0.4s ease-out;
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(6, 182, 212, 0.15);
        }
        .user-row {
          transition: all 0.3s ease-out;
        }
        .user-row:hover {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f7ff 100%);
          padding-left: 8px;
        }
      `}</style>

      <section className="card-hover rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg border border-slate-200 animate-slide-up">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Users Directory</h2>
            <p className="text-sm text-slate-500 mt-1">Manage and monitor all registered users in the system.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-700">{userRows.length} Active</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b-2 border-slate-300 text-slate-900">
                <th className="px-6 py-4 font-bold tracking-wider">ID</th>
                <th className="px-6 py-4 font-bold tracking-wider">First Name</th>
                <th className="px-6 py-4 font-bold tracking-wider">Last Name</th>
                <th className="px-6 py-4 font-bold tracking-wider">Age</th>
                <th className="px-6 py-4 font-bold tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody>
              {userRows.map((user, idx) => (
                <tr 
                  key={user.id} 
                  className="user-row border-b border-slate-200 hover:shadow-md animate-row-slide"
                  style={{ animationDelay: `${200 + idx * 50}ms` }}
                >
                  <td className="px-6 py-4 font-bold text-cyan-600 bg-gradient-to-r from-cyan-50/0 to-cyan-50/40">{user.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{user.firstName}</td>
                  <td className="px-6 py-4 text-slate-700">{user.lastName}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      {user.age}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${user.email}`} className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline transition-colors">
                      {user.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-hover rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-lg border border-slate-200 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <h3 className="mb-4 text-lg font-bold text-slate-900">User Management Tips</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 border border-slate-200 hover:border-cyan-400 transition-colors">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 mb-2">📊 Analytics</p>
            <p className="text-sm text-slate-600">Track user engagement and activity patterns to optimize platform performance.</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-slate-200 hover:border-cyan-400 transition-colors">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 mb-2">🔒 Security</p>
            <p className="text-sm text-slate-600">Monitor user accounts and implement security best practices for data protection.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsersPage;
