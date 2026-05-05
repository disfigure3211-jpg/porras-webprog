import { reportBarData, reportPieData } from './dashboardData';

const ReportsPage = () => {
  const highestValue = Math.max(...reportBarData.flatMap((entry) => [entry.seriesA, entry.seriesB]));

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
        @keyframes barGrow {
          from { width: 0; }
          to { width: var(--bar-width); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(6, 182, 212, 0); }
          100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
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
        .stat-card {
          transition: all 0.3s ease-out;
        }
        .stat-card:hover {
          border-color: #06b6d4;
          background: linear-gradient(135deg, #f8fafc 0%, #e0f7ff 100%);
          transform: translateX(4px);
        }
      `}</style>

      <div className="card-hover rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg border border-slate-200 animate-slide-up">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Revenue & Activity</h2>
            <p className="text-sm text-slate-500 mt-1">Compare quarterly performance and trends across all metrics.</p>
          </div>
          <div className="rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-700">Live Updates</span>
          </div>
        </div>
        <div className="space-y-6">
          {reportBarData.map((data, idx) => (
            <div key={data.quarter} className="space-y-2" style={{ animationDelay: `${200 + idx * 100}ms` }}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">{data.quarter}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500">Total:</span>
                  <span className="text-sm font-bold text-slate-900">{data.seriesA + data.seriesB}</span>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 bar-item shadow-lg shadow-blue-600/50"
                    style={{ 
                      width: `${(data.seriesA / highestValue) * 100}%`,
                      animation: `barGrow 0.6s ease-out`,
                      animationDelay: `${200 + idx * 100}ms`
                    }}
                  />
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 bar-item shadow-lg shadow-cyan-500/50"
                    style={{ 
                      width: `${(data.seriesB / highestValue) * 100}%`,
                      animation: `barGrow 0.6s ease-out`,
                      animationDelay: `${250 + idx * 100}ms`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-hover rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg border border-slate-200 lg:col-span-2 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h3 className="mb-5 text-lg font-bold text-slate-900">Performance Breakdown</h3>
          <div className="grid gap-4">
            {reportPieData.map((item, index) => (
              <div 
                key={item.name} 
                className="stat-card flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 hover:shadow-md"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <span className="flex items-center gap-4 text-slate-700">
                  <span 
                    className="h-4 w-4 rounded-full shadow-lg" 
                    style={{ backgroundColor: ['#2563eb', '#06b6d4', '#22c55e'][index] }}
                  />
                  <span className="font-semibold">{item.name}</span>
                </span>
                <span className="rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-3 py-1 text-sm font-bold text-cyan-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-hover rounded-3xl bg-gradient-to-br from-white via-cyan-50 to-blue-50 p-6 shadow-lg border border-slate-200 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Quick Insights</h3>
          <div className="space-y-4">
            <p className="text-sm leading-6 text-slate-600">
              The reports dashboard provides real-time insight into quarterly activity and status distribution across all key metrics.
            </p>
            <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pro Tip</p>
              <p className="text-sm text-slate-700">Use filters to drill down into specific quarters and analyze performance trends month by month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
