import { Outlet } from 'react-router-dom';
import yoGif from '../assets/yo.gif';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col overflow-hidden rounded-3xl border border-cyan-500/10 bg-slate-900 shadow-2xl shadow-cyan-900/20 sm:flex-row">
        <aside className="hidden flex-1 flex-col justify-center gap-8 bg-gradient-to-br from-cyan-900 via-slate-950 to-slate-950 p-10 text-slate-100 sm:flex">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Hueco Mundo</p>
            <h1 className="text-4xl font-bold tracking-tight text-white">My Soul Never Wavers.</h1>
            <p className="max-w-md text-base leading-7 text-slate-300">
            </p>
          </div>

          <div className="rounded-[2rem] border border-cyan-500/30 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-900/20">
            <img
              src={yoGif}
              alt="Grimmjow decorative"
              className="h-80 w-full rounded-[1.75rem] object-cover"
            />
          </div>

          <div className="rounded-3xl border border-cyan-500/30 bg-slate-900/70 p-6 shadow-inner shadow-cyan-900/20">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Features</p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• Get to know who is the best Espada.</li>
              <li>• Legendary Fights.</li>
              <li>• GOATED</li>
            </ul>
          </div>
        </aside>

        <section className="flex flex-1 items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md rounded-3xl bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/30 ring-1 ring-white/10 sm:p-10">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;
