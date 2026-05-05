import { summaryCards, reportBarData, reportPieData, previewUsers } from './dashboardData';

const DonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#06b6d4', '#0ea5e9', '#22c55e'];
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const segmentLength = (percentage / 100) * circumference;
    const rotation = (offset / circumference) * 360;
    offset += segmentLength;
    return { ...item, percentage, segmentLength, rotation, color: colors[index] };
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <svg width="240" height="240" viewBox="0 0 200 200" className="drop-shadow-2xl">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.4" />
          </filter>
          <style>{`
            @keyframes rotateSegment {
              from { stroke-dashoffset: var(--offset); }
              to { stroke-dashoffset: 0; }
            }
            .segment { animation: rotateSegment 0.8s ease-out forwards; }
          `}</style>
        </defs>
        {/* Background circle */}
        <circle cx="100" cy="100" r="${radius}" fill="none" stroke="#e2e8f0" strokeWidth="22" opacity="0.6" />
        {/* Segments */}
        {segments.map((segment, index) => (
          <circle
            key={index}
            cx="100"
            cy="100"
            r="${radius}"
            fill="none"
            stroke={segment.color}
            strokeWidth="22"
            strokeDasharray={`${segment.segmentLength} ${circumference}`}
            strokeDashoffset={-segments.slice(0, index).reduce((sum, s) => sum + s.segmentLength, 0)}
            strokeLinecap="round"
            className="segment transition-all duration-700"
            style={{
              filter: 'url(#shadow)',
              animation: `rotateSegment 0.8s ease-out forwards`,
              animationDelay: `${index * 100}ms`,
              '--offset': `${-segments.slice(0, index).reduce((sum, s) => sum + s.segmentLength, 0)}`
            }}
          />
        ))}
        {/* Center circle */}
        <circle cx="100" cy="100" r="32" fill="#f1f5f9" filter="url(#shadow)" />
        {/* Center text */}
        <text x="100" y="110" textAnchor="middle" dominantBaseline="middle" className="font-bold fill-slate-900" fontSize="28" fontWeight="bold">
          {total}
        </text>
      </svg>
      {/* Legend */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {segments.map((segment, index) => (
          <div key={segment.name} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md hover:border-cyan-300 transition-all">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: segment.color }} />
            <p className="text-xs font-semibold text-slate-700">{segment.name}</p>
            <p className="text-sm font-bold text-slate-900">{segment.value}</p>
            <p className="text-xs text-slate-500">{segment.percentage.toFixed(0)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const maxSeries = Math.max(...reportBarData.flatMap((item) => [item.seriesA, item.seriesB]));

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
        @keyframes strokeAnimation {
          from { stroke-dashoffset: var(--stroke-offset); }
          to { stroke-dashoffset: var(--current-offset); }
        }
        @keyframes barGrow {
          from { width: 0; }
          to { width: var(--bar-width); }
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(6, 182, 212, 0.15);
        }
        .bar-item {
          transition: all 0.4s ease-out;
        }
        .bar-item:hover {
          opacity: 0.8;
          filter: brightness(1.1);
        }
      `}</style>
      
      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card, idx) => (
          <article 
            key={card.label} 
            className="card-hover rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg backdrop-blur-sm animate-slide-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{card.label}</p>
                <p className="mt-4 text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{card.value}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20" />
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 card-hover rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg border border-slate-200 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Quarterly Performance</h2>
              <p className="text-xs text-slate-500 mt-1">Revenue trend analysis</p>
            </div>
            <span className="rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-3 py-1 text-xs font-semibold text-cyan-700">Live data</span>
          </div>
          <div className="space-y-6">
            {reportBarData.map((item, idx) => (
              <div key={item.quarter} className="space-y-2" style={{ animationDelay: `${400 + idx * 100}ms` }}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700">{item.quarter}</span>
                  <span className="font-bold text-slate-900">{item.seriesA + item.seriesB}</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 bar-item shadow-lg shadow-cyan-500/50" 
                      style={{ 
                        width: `${(item.seriesA / maxSeries) * 100}%`,
                        animation: `barGrow 0.6s ease-out`,
                        animationDelay: `${400 + idx * 100}ms`
                      }} 
                    />
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 bar-item shadow-lg shadow-blue-600/50" 
                      style={{ 
                        width: `${(item.seriesB / maxSeries) * 100}%`,
                        animation: `barGrow 0.6s ease-out`,
                        animationDelay: `${450 + idx * 100}ms`
                      }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-hover rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg border border-slate-200 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Status Breakdown</h2>
              <p className="text-xs text-slate-500 mt-1">Task distribution</p>
            </div>
          </div>
          <DonutChart data={reportPieData} />
        </div>
      </section>

      <section className="card-hover rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg border border-slate-200 animate-slide-up" style={{ animationDelay: '500ms' }}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">User Overview</h2>
            <p className="text-xs text-slate-500 mt-1">Recent active users</p>
          </div>
          <span className="rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-3 py-1 text-xs font-semibold text-cyan-700">{previewUsers.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-300 text-slate-900">
                <th className="px-4 py-3 font-bold">ID</th>
                <th className="px-4 py-3 font-bold">First Name</th>
                <th className="px-4 py-3 font-bold">Last Name</th>
                <th className="px-4 py-3 font-bold">Age</th>
                <th className="px-4 py-3 font-bold">Email</th>
              </tr>
            </thead>
            <tbody>
              {previewUsers.map((user, idx) => (
                <tr 
                  key={user.id} 
                  className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-colors"
                  style={{ animationDelay: `${600 + idx * 50}ms` }}
                >
                  <td className="px-4 py-3 font-semibold text-slate-900">{user.id}</td>
                  <td className="px-4 py-3">{user.firstName}</td>
                  <td className="px-4 py-3">{user.lastName}</td>
                  <td className="px-4 py-3">{user.age}</td>
                  <td className="px-4 py-3 text-cyan-600">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
