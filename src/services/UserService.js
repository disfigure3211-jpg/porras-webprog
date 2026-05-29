import { API_ENDPOINTS, apiCall } from '../config/api';

const STORAGE_KEY = 'local_users_v1';

function loadUsersFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = [
        { id: 'u1', email: 'admin@example.com', password: 'password', firstName: 'Admin', type: 'admin', isActive: true },
        { id: 'u2', email: 'editor@example.com', password: 'password', firstName: 'Editor', type: 'editor', isActive: true },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveUsersToStorage(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export const fetchUsers = async () => {
  try {
    const data = await apiCall(API_ENDPOINTS.USERS);
    return { data };
  } catch (err) {
    console.warn('Falling back to local storage for users');
    const data = loadUsersFromStorage();
    return { data };
  }
};

export const createUser = async (payload) => {
  try {
    const data = await apiCall(API_ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { data };
  } catch (err) {
    console.warn('Using local storage fallback for createUser');
    const users = loadUsersFromStorage();
    const newUser = { id: `u-${Date.now()}`, ...payload };
    users.push(newUser);
    saveUsersToStorage(users);
    return Promise.resolve({ data: newUser });
  }
};

export const updateUser = async (id, payload) => {
  try {
    const data = await apiCall(`${API_ENDPOINTS.USERS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return { data };
  } catch (err) {
    console.warn('Using local storage fallback for updateUser');
    const users = loadUsersFromStorage();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return Promise.reject(new Error('User not found'));
    users[idx] = { ...users[idx], ...payload };
    saveUsersToStorage(users);
    return Promise.resolve({ data: users[idx] });
  }
};

export const deleteUser = async (id) => {
  try {
    const data = await apiCall(`${API_ENDPOINTS.USERS}/${id}`, {
      method: 'DELETE',
    });
    return { data };
  } catch (err) {
    console.warn('Using local storage fallback for deleteUser');
    let users = loadUsersFromStorage();
    users = users.filter((u) => u.id !== id);
    saveUsersToStorage(users);
    return Promise.resolve({ data: { success: true } });
  }
};

export const loginUser = async (credentials) => {
  try {
    const data = await apiCall(`${API_ENDPOINTS.USERS}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return { data };
  } catch (err) {
    console.warn('Using local storage fallback for loginUser');
    const users = loadUsersFromStorage();
    const found = users.find((u) => u.email === credentials.email && u.password === credentials.password);
    if (!found) return Promise.reject({ response: { data: { message: 'Invalid email or password' } } });
    const token = `local-token-${found.id}`;
    return Promise.resolve({ data: { token, type: found.type, firstName: found.firstName || '', id: found.id } });
  }
};
