import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const initialSignUpForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  age: '',
  contactNumber: '',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(initialSignUpForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const nextErrors = {};

    if (!formState.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!formState.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!formState.username.trim()) nextErrors.username = 'Username is required.';
    if (/\s/.test(formState.username)) nextErrors.username = 'Username cannot contain spaces.';
    if (!formState.email.trim()) nextErrors.email = 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formState.password) nextErrors.password = 'Password is required.';
    if (formState.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (!formState.age.trim()) nextErrors.age = 'Age is required.';
    if (!/^[0-9]+$/.test(formState.age)) nextErrors.age = 'Age must be a number.';
    if (!formState.contactNumber.trim()) nextErrors.contactNumber = 'Contact number is required.';
    if (!/^\d{11}$/.test(formState.contactNumber)) nextErrors.contactNumber = 'Contact number must be 11 digits.';

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage('');
      return;
    }

    setSuccessMessage('Your account was created successfully! Redirecting to sign-in...');
    setTimeout(() => navigate('/auth/signin'), 1400);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
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
              name="firstName"
              value={formState.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
            {errors.firstName ? <p className="text-xs text-rose-400">{errors.firstName}</p> : null}
          </label>
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Last Name</span>
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
            {errors.lastName ? <p className="text-xs text-rose-400">{errors.lastName}</p> : null}
          </label>
        </div>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>Username</span>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            placeholder="No spaces allowed"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
          {errors.username ? <p className="text-xs text-rose-400">{errors.username}</p> : null}
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
          {errors.email ? <p className="text-xs text-rose-400">{errors.email}</p> : null}
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            placeholder="At least 8 characters"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
          {errors.password ? <p className="text-xs text-rose-400">{errors.password}</p> : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Age</span>
            <input
              type="number"
              name="age"
              value={formState.age}
              onChange={handleInputChange}
              placeholder="Age"
              className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
            {errors.age ? <p className="text-xs text-rose-400">{errors.age}</p> : null}
          </label>
          <label className="block space-y-2 text-sm text-slate-300">
            <span>Contact Number</span>
            <input
              type="tel"
              name="contactNumber"
              value={formState.contactNumber}
              onChange={handleInputChange}
              placeholder="11 digits"
              className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
            {errors.contactNumber ? <p className="text-xs text-rose-400">{errors.contactNumber}</p> : null}
          </label>
        </div>

        {successMessage ? (
          <div className="rounded-3xl border border-emerald-500 bg-emerald-950/80 px-4 py-3 text-sm text-emerald-200">
            {successMessage}
          </div>
        ) : null}

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
