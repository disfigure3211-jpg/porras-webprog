import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../services/ArticleService';

const statusOptions = ['all', 'active', 'inactive'];

const initialForm = {
  slug: '',
  title: '',
  paragraphs: '',
  status: 'active',
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formState, setFormState] = useState(initialForm);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const loadArticles = async () => {
    try {
      const response = await fetchArticles();
      setArticles(response.data || []);
    } catch (err) {
      setError('Unable to load articles.');
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = [article.slug, article.title].join(' ').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [articles, searchTerm, statusFilter]);

  const openAddModal = () => {
    setEditingArticle(null);
    setFormState(initialForm);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (article) => {
    setEditingArticle(article);
    setFormState({
      slug: article.slug,
      title: article.title,
      paragraphs: article.paragraphs.join('\n'),
      status: article.status,
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!formState.slug.trim() || !formState.title.trim()) {
      setError('Slug and title are required.');
      return;
    }

    const payload = {
      slug: formState.slug.trim(),
      title: formState.title.trim(),
      paragraphs: formState.paragraphs
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line),
      status: formState.status,
    };

    try {
      if (editingArticle) {
        await updateArticle(editingArticle._id, payload);
        setFeedback('Article updated successfully.');
      } else {
        await createArticle(payload);
        setFeedback('Article created successfully.');
      }
      setIsModalOpen(false);
      setEditingArticle(null);
      loadArticles();
      setError('');
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save article.');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await deleteArticle(id);
      loadArticles();
      setFeedback('Article status updated.');
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      setError('Unable to update article status.');
    }
  };

  const rows = filteredArticles.map((article, index) => ({
    ...article,
    id: article._id,
    displayId: `A${String(index + 1).padStart(3, '0')}`,
  }));

  const columns = [
    { field: 'displayId', headerName: 'ID', width: 110 },
    { field: 'slug', headerName: 'Slug', width: 180 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 180 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 140,
      valueGetter: (params) => params.row.paragraphs?.length || 0,
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1,
      minWidth: 240,
      sortable: false,
      renderCell: (params) => {
        const preview = params.row.paragraphs?.[0] || '';
        return <span>{preview.length > 100 ? `${preview.slice(0, 100)}...` : preview}</span>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value === 'active' ? 'Active' : 'Inactive'}
          color={params.value === 'active' ? 'success' : 'default'}
          variant="filled"
        />
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
          <Button variant="outlined" size="small" onClick={() => openEditModal(params.row)}>
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            color={params.row.isActive ? 'error' : 'success'}
            onClick={() => handleToggleStatus(params.row.id)}
          >
            {params.row.isActive ? 'Disable' : 'Enable'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'grid', gap: 24, animation: 'fadeIn 0.45s ease-out' }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Articles
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Manage article content and toggle published status from the dashboard.
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={openAddModal} sx={{ minWidth: 180, py: 1.5 }}>
            Add Article
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search articles"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by slug or title"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(event) => setStatusFilter(event.target.value)}>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option === 'all' ? 'All Statuses' : option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {feedback ? (
          <Box sx={{ mt: 3, p: 2, borderRadius: 3, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
            <Typography color="success.main">{feedback}</Typography>
          </Box>
        ) : null}
        {error ? (
          <Box sx={{ mt: 3, p: 2, borderRadius: 3, bgcolor: 'error.50', border: '1px solid', borderColor: 'error.200' }}>
            <Typography color="error.main">{error}</Typography>
          </Box>
        ) : null}
      </Card>

      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            pageSize={8}
            rowsPerPageOptions={[5, 8, 12]}
            disableSelectionOnClick
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
            bgcolor: 'rgba(15, 23, 42, 0.75)',
            display: 'grid',
            placeItems: 'center',
            p: 2,
          }}
        >
          <Card sx={{ width: '100%', maxWidth: 920, maxHeight: 'calc(100vh - 60px)', borderRadius: 3, p: 3, overflowY: 'auto' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {editingArticle ? 'Edit Article' : 'Add Article'}
                </Typography>
                <Typography color="text.secondary">
                  {editingArticle ? 'Update the article and save your changes.' : 'Create a new article to display on the public article list.'}
                </Typography>
              </Box>
              <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </Stack>

            <Box component="form" onSubmit={handleSave} sx={{ display: 'grid', gap: 16 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Slug"
                    name="slug"
                    value={formState.slug}
                    onChange={handleInputChange}
                    helperText="Unique URL-friendly slug"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    label="Paragraphs"
                    name="paragraphs"
                    value={formState.paragraphs}
                    onChange={handleInputChange}
                    helperText="One paragraph per line"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select name="status" value={formState.status} label="Status" onChange={handleInputChange}>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {error ? (
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'error.50', border: '1px solid', borderColor: 'error.200' }}>
                  <Typography color="error.main">{error}</Typography>
                </Box>
              ) : null}

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save Article
                </Button>
              </Stack>
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default DashArticleListPage;
