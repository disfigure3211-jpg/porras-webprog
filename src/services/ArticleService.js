import defaultArticles from '../assets/article-content';
import { API_ENDPOINTS, apiCall } from '../config/api';

const STORAGE_KEY = 'local_articles_v1';

function loadLocalArticles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // initialize from bundled content
      const seeded = defaultArticles.map((a, idx) => ({
        _id: `local-${idx + 1}`,
        slug: a.name,
        title: a.title,
        paragraphs: a.content,
        status: 'active',
        isActive: true,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveLocalArticles(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export const fetchArticles = async () => {
  try {
    const data = await apiCall(API_ENDPOINTS.ARTICLES);
    return { data };
  } catch (err) {
    console.warn('Falling back to local storage for articles');
    const data = loadLocalArticles();
    return { data };
  }
};

export const createArticle = async (payload) => {
  try {
    const data = await apiCall(API_ENDPOINTS.ARTICLES, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { data };
  } catch (err) {
    console.warn('Using local storage fallback for createArticle');
    const list = loadLocalArticles();
    const newItem = { _id: `local-${Date.now()}`, ...payload };
    list.unshift(newItem);
    saveLocalArticles(list);
    return Promise.resolve({ data: newItem });
  }
};

export const updateArticle = async (id, payload) => {
  try {
    const data = await apiCall(`${API_ENDPOINTS.ARTICLES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return { data };
  } catch (err) {
    console.warn('Using local storage fallback for updateArticle');
    const list = loadLocalArticles();
    const idx = list.findIndex((i) => i._id === id);
    if (idx === -1) return Promise.reject(new Error('Not found'));
    list[idx] = { ...list[idx], ...payload };
    saveLocalArticles(list);
    return Promise.resolve({ data: list[idx] });
  }
};

export const deleteArticle = async (id) => {
  try {
    const data = await apiCall(`${API_ENDPOINTS.ARTICLES}/${id}`, {
      method: 'DELETE',
    });
    return { data };
  } catch (err) {
    console.warn('Using local storage fallback for deleteArticle');
    let list = loadLocalArticles();
    list = list.filter((i) => i._id !== id);
    saveLocalArticles(list);
    return Promise.resolve({ data: { success: true } });
  }
};
