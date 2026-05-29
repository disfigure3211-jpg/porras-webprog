import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Alert, Stack, Typography } from '@mui/material';
import { createUser } from '../../services/UserService';

const initialSignUpForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  age: '',
  contactNumber: '',
  address: '',
  gender: 'male',
  type: 'viewer',
  isActive: true,
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(initialSignUpForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    if (!formState.address.trim()) nextErrors.address = 'Address is required.';

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage('');
      return;
    }

    setIsLoading(true);
    try {
      await createUser({
        ...formState,
        age: Number(formState.age),
      });
      setSuccessMessage('Your account was created successfully! Redirecting to sign-in...');
      setTimeout(() => navigate('/auth/signin'), 1400);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Unable to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <Box className="space-y-8">
      <Box className="space-y-3">
        <Typography variant="overline" display="block" sx={{ letterSpacing: '0.25em', color: '#38bdf8' }}>
          Create access
        </Typography>
        <Typography variant="h3" fontWeight={700} color="#fff">
          Be one of us.
        </Typography>
        <Typography color="#94a3b8">Register and join the Hollows.</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} className="space-y-6">
        {apiError ? <Alert severity="error">{apiError}</Alert> : null}
        {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formState.firstName}
              onChange={handleInputChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName || ' '}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#0891b2' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formState.lastName}
              onChange={handleInputChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName || ' '}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#0891b2' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              error={Boolean(errors.username)}
              helperText={errors.username || ' '}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#0891b2' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email || ' '}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#0891b2' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleInputChange}
              error={Boolean(errors.password)}
              helperText={errors.password || ' '}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#0891b2' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={formState.contactNumber}
              onChange={handleInputChange}
              error={Boolean(errors.contactNumber)}
              helperText={errors.contactNumber || ' '}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#0891b2' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formState.age}
              onChange={handleInputChange}
              error={Boolean(errors.age)}
              helperText={errors.age || ' '}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#0891b2' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#94a3b8' }}>Gender</InputLabel>
              <Select name="gender" value={formState.gender} label="Gender" onChange={handleInputChange} sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#0891b2' } }} MenuProps={{ PaperProps: { sx: { backgroundColor: '#1e293b', color: '#fff' } } }}>
                <MenuItem value="male" sx={{ color: '#fff' }}>Male</MenuItem>
                <MenuItem value="female" sx={{ color: '#fff' }}>Female</MenuItem>
                <MenuItem value="other" sx={{ color: '#fff' }}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#94a3b8' }}>Role</InputLabel>
              <Select name="type" value={formState.type} label="Role" onChange={handleInputChange} sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#0891b2' } }} MenuProps={{ PaperProps: { sx: { backgroundColor: '#1e293b', color: '#fff' } } }}>
                <MenuItem value="admin" sx={{ color: '#fff' }}>Admin</MenuItem>
                <MenuItem value="editor" sx={{ color: '#fff' }}>Editor</MenuItem>
                <MenuItem value="viewer" sx={{ color: '#fff' }}>Viewer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formState.address}
              onChange={handleInputChange}
              error={Boolean(errors.address)}
              helperText={errors.address || ' '}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#0891b2' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root': { color: '#94a3b8' },
                '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={formState.isActive}
                  onChange={handleInputChange}
                  color="primary"
                />
              }
              label="Active user"
              sx={{ color: '#e2e8f0' }}
            />
          </Grid>
        </Grid>

        <Stack spacing={3}>
          <Button type="submit" variant="contained" size="large" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Forge Access'}
          </Button>
          <Button variant="outlined" size="large">
            Continue with Google
          </Button>
          <Button variant="outlined" size="large">
            Continue with Apple
          </Button>
        </Stack>
      </Box>

      <Typography variant="body2" color="#94a3b8" align="center">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-medium text-cyan-300 hover:text-cyan-100">
          Sign in to continue
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUpPage;
