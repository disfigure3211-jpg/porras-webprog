import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { fetchArticles } from '../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetchArticles();
        setArticles((response.data || []).filter((article) => article.isActive));
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load articles.');
      }
    };

    loadArticles();
  }, []);

  return (
    <Box sx={{ display: 'grid', gap: 4, p: { xs: 3, md: 6 } }}>
      <Card sx={{ p: 4, bgcolor: 'background.paper' }}>
        <CardHeader
          title="Articles"
          subheader="Explore the latest active articles from the public library."
          titleTypographyProps={{ variant: 'h4', fontWeight: 700 }}
          subheaderTypographyProps={{ color: 'text.secondary' }}
        />
        <Box sx={{ mt: 3 }}>
          <Button component={RouterLink} to="/" variant="contained" color="primary">
            Back Home
          </Button>
        </Box>
      </Card>

      {error ? (
        <Card sx={{ p: 3, bgcolor: 'error.50', border: '1px solid', borderColor: 'error.200' }}>
          <Typography color="error.main">{error}</Typography>
        </Card>
      ) : null}

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} md={6} key={article._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {article.slug}
                  </Typography>
                  <Chip
                    label={article.status === 'active' ? 'Active' : 'Inactive'}
                    color={article.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {article.paragraphs?.[0]?.slice(0, 180) || 'No preview available.'}
                  {article.paragraphs?.[0]?.length > 180 ? '...' : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.paragraphs?.length ?? 0} paragraph{article.paragraphs?.length === 1 ? '' : 's'}
                </Typography>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                <Button component={RouterLink} to={`/articles/${article.slug}`} variant="outlined">
                  Read more
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ArticleListPage;
