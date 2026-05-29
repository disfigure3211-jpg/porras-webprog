// Remove any hardcoded backend URL to avoid connecting to a backend port during frontend-only runs
export const HOST = import.meta.env.VITE_API_URL || '';
