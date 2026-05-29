import { useMemo, useState } from 'react';
import usersSeedRaw from '../../assets/users.json?raw';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const usersSeed = JSON.parse(usersSeedRaw);
const roleOptions = ['all', 'admin', 'editor', 'viewer'];
const genderOptions = ['all', 'male', 'female', 'other'];
const statusOptions = ['all', 'active', 'inactive'];

const initialForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  age: '',
  contactNumber: '',
  address: '',
  role: 'viewer',
  gender: 'male',
  isActive: true,
};

const UsersPage = () => {
  const [users, setUsers] = useState(usersSeed.map((user, index) => ({ id: index + 1, ...user })));
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pageSize, setPageSize] = useState(5);
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const isEditing = editingUserId !== null;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = [user.firstName, user.lastName, user.email, user.username]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesGender = genderFilter === 'all' || user.gender === genderFilter;
      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'active' ? user.isActive : !user.isActive);
      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, genderFilter, statusFilter]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const normalizedUser = {
      firstName: formState.firstName.trim(),
      lastName: formState.lastName.trim(),
      username: formState.username.trim(),
      email: formState.email.trim(),
      password: formState.password,
      age: Number(formState.age),
      contactNumber: formState.contactNumber,
      address: formState.address.trim(),
      role: formState.role,
      gender: formState.gender,
      isActive: formState.isActive,
    };

    if (isEditing) {
      setUsers((current) => current.map((user) => (user.id === editingUserId ? { ...user, ...normalizedUser } : user)));
      setFeedbackMessage('User updated successfully.');
    } else {
      setUsers((current) => [{ id: current.length + 1, ...normalizedUser }, ...current]);
      setFeedbackMessage('User added successfully.');
    }

    setFormState(initialForm);
    setEditingUserId(null);
    setIsModalOpen(false);
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const openAddModal = () => {
    setFormState(initialForm);
    setErrors({});
    setEditingUserId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setFormState({ ...user, age: String(user.age) });
    setErrors({});
    setEditingUserId(user.id);
    setIsModalOpen(true);
  };

  const toggleStatus = (id) => {
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user)));
  };

  const columns = [
    { field: 'firstName', headerName: 'First name', width: 140 },
    { field: 'lastName', headerName: 'Last name', width: 140 },
    { field: 'username', headerName: 'Username', width: 140 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
    { field: 'role', headerName: 'Role', width: 110, valueFormatter: ({ value }) => value?.toString()?.replace(/^./, (c) => c.toUpperCase()) },
    { field: 'gender', headerName: 'Gender', width: 110, valueFormatter: ({ value }) => value?.toString()?.replace(/^./, (c) => c.toUpperCase()) },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Box component="span" sx={{ px: 1.5, py: 0.5, borderRadius: 2, fontSize: 12, fontWeight: 700, color: params.value ? 'success.main' : 'text.secondary', bgcolor: params.value ? 'success.100' : 'grey.100' }}>
          {params.value ? 'Active' : 'Inactive'}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openEditModal(params.row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.isActive ? 'error' : 'success'}
            onClick={() => toggleStatus(params.row.id)}
          >
            {params.row.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'grid', gap: 24, animation: 'fadeIn 0.6s ease-out' }}>
      <Box component={Card} sx={{ borderRadius: 3, boxShadow: 3, p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Users Directory
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Search, filter, and manage users directly from the DataGrid.
            </Typography>
          </Box>
          <Button variant="contained" color="info" onClick={openAddModal} sx={{ minWidth: 180, py: 1.5 }}>
            Add New User
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search users"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Name, email, username"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={roleFilter} label="Role" onChange={(event) => setRoleFilter(event.target.value)}>
                {roleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option === 'all' ? 'All Roles' : option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select value={genderFilter} label="Gender" onChange={(event) => setGenderFilter(event.target.value)}>
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option === 'all' ? 'All Genders' : option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(event) => setStatusFilter(event.target.value)}>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option === 'all' ? 'All Statuses' : option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {feedbackMessage ? (
          <Box sx={{ mt: 3, p: 2, borderRadius: 3, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
            <Typography color="success.main">{feedbackMessage}</Typography>
          </Box>
        ) : null}
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            autoHeight
            sx={{ border: 0, '& .MuiDataGrid-columnHeader': { bgcolor: 'grey.100' } }}
          />
        </Box>
      </Card>

      {isModalOpen && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
            bgcolor: 'rgba(15, 23, 42, 0.72)',
            display: 'grid',
            placeItems: 'center',
            p: 2,
          }}
        >
          <Card sx={{ width: '100%', maxWidth: 900, maxHeight: 'calc(100vh - 60px)', borderRadius: 3, p: 3, boxShadow: 24, overflowY: 'auto' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3, gap: 2, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {isEditing ? 'Edit User' : 'Add New User'}
                </Typography>
                <Typography color="text.secondary">
                  {isEditing ? 'Update user details and save changes.' : 'Fill in the details and save the user.'}
                </Typography>
              </Box>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setErrors({});
                  setEditingUserId(null);
                  setFormState(initialForm);
                }}
                variant="outlined"
              >
                Close
              </Button>
            </Stack>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, minmax(240px, 1fr))' }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName || ' '}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formState.lastName}
                onChange={handleInputChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName || ' '}
              />
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formState.username}
                onChange={handleInputChange}
                error={Boolean(errors.username)}
                helperText={errors.username || ' '}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email || ' '}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
                error={Boolean(errors.password)}
                helperText={errors.password || ' '}
              />
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={formState.age}
                onChange={handleInputChange}
                error={Boolean(errors.age)}
                helperText={errors.age || ' '}
              />
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formState.contactNumber}
                onChange={handleInputChange}
                error={Boolean(errors.contactNumber)}
                helperText={errors.contactNumber || ' '}
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formState.address}
                onChange={handleInputChange}
                error={Boolean(errors.address)}
                helperText={errors.address || ' '}
              />
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={formState.role} label="Role" onChange={handleInputChange}>
                  {roleOptions.filter((option) => option !== 'all').map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formState.gender} label="Gender" onChange={handleInputChange}>
                  {genderOptions.filter((option) => option !== 'all').map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, gridColumn: 'span 2' }}>
                <input type="checkbox" name="isActive" checked={formState.isActive} onChange={handleInputChange} id="active-toggle" />
                <label htmlFor="active-toggle">Set user as active</label>
              </Box>
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ gridColumn: '1 / -1' }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsModalOpen(false);
                    setErrors({});
                    setEditingUserId(null);
                    setFormState(initialForm);
                  }}
                  sx={{ minWidth: 120 }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" sx={{ minWidth: 140 }}>
                  Save User
                </Button>
              </Stack>
            </Box>
          </Card>
        </Box>
      )}

      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, bgcolor: 'background.paper' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography color="text.secondary">{filteredUsers.length} of {users.length} users shown</Typography>
          <Typography color="text.secondary">Rows per page: {pageSize}</Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default UsersPage;
