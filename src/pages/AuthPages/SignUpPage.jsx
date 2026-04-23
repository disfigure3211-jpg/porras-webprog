import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/auth/signin');
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Create access</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Be one of us.</h1>
        <p className="text-slate-400">Register and join the Hollows.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm text-slate-300">
            <span>First Name</span>
            <input
              type="text"
              required
              placeholder="First name"
              className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Last Name</span>
            <input
              type="text"
              required
              placeholder="Last name"
              className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>
        </div>

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
            placeholder="Create a password"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </label>

        <div className="space-y-3">
          <Button type="submit" variant="primary" className="w-full py-3">
            Forge Access
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
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-medium text-cyan-300 hover:text-cyan-100">
          Sign in to continue
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
