import { NavLink } from 'react-router-dom';
import grimmjowLogo from '../assets/grimmjow.jpg';

const links = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'ARTICLES', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300',
    isActive
      ? 'bg-cyan-500 text-white rounded-full shadow-lg'
      : 'text-slate-200 hover:text-cyan-200 hover:bg-slate-800 rounded-full',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="border-b-2 border-slate-800 bg-[#0b1524] text-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={grimmjowLogo}
            alt="Grimmjow"
            className="h-10 w-10 rounded-lg object-cover border border-cyan-300"
          />
          <span className="text-lg font-bold tracking-widest text-cyan-200">GRIMMJOW</span>
        </NavLink>

        <div className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/auth/signin"
            className="rounded-full border border-cyan-500/40 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 transition hover:bg-cyan-500 hover:text-slate-950"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/auth/signup"
            className="rounded-full bg-cyan-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-cyan-400"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;