import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import grimmjowLogo from '../../assets/grimmjow.jpg';
import { summaryCards, reportBarData, reportPieData } from '../DashboardPages/dashboardData';

const DonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#06b6d4', '#0ea5e9', '#22c55e'];
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const segmentLength = (percentage / 100) * circumference;
    return { ...item, percentage, segmentLength, color: colors[index] };
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl w-full max-w-[200px]">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.4" />
          </filter>
        </defs>
        <g transform="rotate(-90 100 100)">
          <circle cx="100" cy="100" r="50" fill="none" stroke="#e2e8f0" strokeWidth="22" opacity="0.6" />
          {segments.reduce((acc, segment, index) => {
            const prevLength = acc.reduce((sum, item) => sum + item.segmentLength, 0);
            acc.push(
              <circle
                key={segment.name}
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke={segment.color}
                strokeWidth="22"
                strokeDasharray={`${segment.segmentLength} ${circumference}`}
                strokeDashoffset={-prevLength}
                strokeLinecap="round"
                style={{ filter: 'url(#shadow)' }}
              />
            );
            return acc;
          }, [])}
        </g>
        <circle cx="100" cy="100" r="32" fill="#f1f5f9" filter="url(#shadow)" />
        <text x="100" y="110" textAnchor="middle" dominantBaseline="middle" className="font-bold fill-slate-900" fontSize="28">
          {total}
        </text>
      </svg>
      <div className="w-full space-y-3">
        {segments.map((segment) => (
          <div key={segment.name} className="flex items-center justify-between rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-slate-100 shadow-inner">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-3.5 w-3.5 rounded-full" style={{ backgroundColor: segment.color }} />
              <div>
                <p className="font-semibold text-slate-100">{segment.name}</p>
                <p className="text-xs text-slate-400">{segment.percentage.toFixed(0)}% of tasks</p>
              </div>
            </div>
            <span className="text-sm font-bold text-white">{segment.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SignInPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const maxSeries = Math.max(...reportBarData.flatMap((item) => [item.seriesA, item.seriesB]));
  const statusColors = {
    Completed: '#06b6d4',
    Pending: '#0ea5e9',
    Overdue: '#22c55e',
  };
  const totalTasks = reportPieData.reduce((sum, item) => sum + item.value, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAuthenticated(true);
  };

  const handleNavClick = (to) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(to);
    }, 300);
  };

  if (isAuthenticated) {
    return (
      <div className={`fixed inset-0 z-50 min-h-screen overflow-auto bg-slate-950 text-white transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
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

        <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src={grimmjowLogo} alt="Grimmjow logo" className="h-12 w-12 rounded-xl border border-cyan-500/30 object-cover" />
              <div>
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <p className="text-sm text-slate-400">Your analytics are live after sign-in.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-cyan-300 hover:text-cyan-100 transition"
            >
              ← Sign Out
            </button>
          </div>

          <nav className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-slate-300">
            <button onClick={() => handleNavClick('/')} className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:scale-105 active:scale-95 active:bg-cyan-500/20">
              Home
            </button>
            <button onClick={() => handleNavClick('/about')} className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:scale-105 active:scale-95 active:bg-cyan-500/20">
              About
            </button>
            <button onClick={() => handleNavClick('/articles')} className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:scale-105 active:scale-95 active:bg-cyan-500/20">
              Articles
            </button>
          </nav>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {summaryCards.map((card, idx) => (
            <article
              key={card.label}
              className="card-hover min-h-[160px] rounded-3xl border border-slate-600 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{card.label}</p>
                  <p className="mt-4 text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{card.value}</p>
                </div>
                <div className="ml-auto h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20" />
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
          <div className="card-hover rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg border border-slate-600 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Quarterly Performance</h2>
                <p className="text-xs text-slate-400 mt-1">Revenue trend analysis</p>
              </div>
              <span className="rounded-full bg-gradient-to-r from-cyan-900 to-blue-900 px-3 py-1 text-xs font-semibold text-cyan-300">Live data</span>
            </div>
            <div className="space-y-6">
              {reportBarData.map((item, idx) => (
                <div key={item.quarter} className="space-y-2" style={{ animationDelay: `${400 + idx * 100}ms` }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-300">{item.quarter}</span>
                    <span className="font-bold text-white">{item.seriesA + item.seriesB}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 bar-item shadow-lg shadow-cyan-500/50"
                        style={{
                          width: `${(item.seriesA / maxSeries) * 100}%`,
                          animation: `barGrow 0.6s ease-out`,
                          animationDelay: `${400 + idx * 100}ms`
                        }}
                      />
                    </div>
                    <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
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

          <div className="card-hover rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg border border-slate-600 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">Status Breakdown</h2>
              <p className="text-xs text-slate-400 mt-1">Task distribution</p>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl bg-slate-950/80 p-4 text-center">
                <div className="mx-auto max-w-[220px]">
                  <DonutChart data={reportPieData} />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-300">Projected task completion against current workload.</p>
              </div>
              <div className="space-y-3">
                {reportPieData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-4 rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-3.5 w-3.5 rounded-full" style={{ backgroundColor: statusColors[item.name] }} />
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-xs text-slate-400">
                          {item.value} tasks · {(item.value / reportPieData.reduce((sum, current) => sum + current.value, 0) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Sign in</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Enter the gate</h1>
        <p className="text-slate-400">Welcome to Espada 6 lore.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Email</span>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>Password</span>
          <input
            type="password"
            required
            placeholder="Enter your password"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </label>

        <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500" />
            Remember me
          </label>
          <Link to="#" className="font-medium text-cyan-300 hover:text-cyan-100">
            Forgot password?
          </Link>
        </div>

        <div className="space-y-3">
          <Button type="submit" variant="primary" className="w-full py-3">
            Enter the Gate
          </Button>
          <Button variant="secondary" className="w-full py-3">
            Continue with Google
          </Button>
          <Button variant="secondary" className="w-full py-3">
            Continue with Apple
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to="/auth/signup" className="font-medium text-cyan-300 hover:text-cyan-100">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;

