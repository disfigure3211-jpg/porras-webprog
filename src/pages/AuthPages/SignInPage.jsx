import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard/users');
  };

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
