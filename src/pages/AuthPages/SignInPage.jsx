import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { TextField, Alert, Stack } from '@mui/material';
import { loginUser } from '../../services/UserService';

const SignInPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginUser({
        email: formState.email,
        password: formState.password,
      });
      const data = response.data;

      if (data.type === 'viewer') {
        setError('Viewers are not allowed to log in.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('type', data.type);
      localStorage.setItem('firstName', data.firstName);
      navigate('/dashboard/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Sign in</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Enter the gate</h1>
        <p className="text-slate-400">Welcome to Espada 6 lore.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Stack spacing={3}>
          <TextField
            name="email"
            type="email"
            label="Email"
            value={formState.email}
            onChange={handleInputChange}
            required
            fullWidth
            InputLabelProps={{ style: { color: '#94a3b8' } }}
            inputProps={{ style: { color: '#e2e8f0' } }}
            sx={{ bgcolor: '#0f172a', borderRadius: '24px' }}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            value={formState.password}
            onChange={handleInputChange}
            required
            fullWidth
            InputLabelProps={{ style: { color: '#94a3b8' } }}
            inputProps={{ style: { color: '#e2e8f0' } }}
            sx={{ bgcolor: '#0f172a', borderRadius: '24px' }}
          />
        </Stack>

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
          <Button type="submit" variant="primary" className="w-full py-3" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Enter the Gate'}
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
