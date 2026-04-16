import { Link } from 'react-router-dom';
import tuffGif from '../assets/tuff.gif';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#08101f] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-10 md:grid-cols-[2.4fr_0.9fr_0.9fr_1.1fr]">
        <div className="space-y-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Grimmjow Jaegerjaquez</p>
          <h2 className="text-3xl font-bold leading-tight text-white">My territory. My battles. My rules.</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            The strongest fights, the sharpest moves, and the darkest attitude. This is the place where Grimmjow’s power is on display.
          </p>
        </div>

        <div className="pt-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Navigate</p>
          <div className="space-y-2 text-sm text-slate-300">
            <Link className="block hover:text-cyan-200" to="/">Home</Link>
            <Link className="block hover:text-cyan-200" to="/about">About</Link>
            <Link className="block hover:text-cyan-200" to="/articles">Articles</Link>
          </div>
        </div>

        <div className="pt-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">No mercy</p>
          <p className="text-sm leading-7 text-slate-400">
            Quick. Brutal. Unforgiving. Every fight listed here is meant to show exactly what Grimmjow is made of.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Espada energy
            </span>
            <span className="inline-flex rounded-full bg-slate-700/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
              Pantera mode
            </span>
          </div>
        </div>

        <div className="flex items-end justify-center md:justify-end md:pl-6">
          <img
            src={tuffGif}
            alt="Grimmjow tuff"
            className="h-44 w-auto rounded-3xl border border-slate-700 object-cover shadow-[0_0_30px_rgba(8,16,31,0.45)]"
          />
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">
        © 2026 Grimmjow Chronicles. Crafted for a dark Bleach-inspired experience.
      </div>
    </footer>
  );
};

export default Footer;
