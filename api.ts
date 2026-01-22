import { Recipe } from './types';

const API_BASE = 'http://localhost:3001/api';
const MOCK_DELAY = 500;

// Helper to check if backend is running, else fallback to null (or handle gracefully)
async function fetchWithFallback(endpoint: string, options?: RequestInit) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, options);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable. Ensure server.js is running.");
    throw err;
  }
}

export const api = {
  getRecipes: async (params?: { search?: string; type?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.type) query.append('type', params.type);
    if (params?.limit) query.append('limit', String(params.limit));
    
    return fetchWithFallback(`/recipes?${query.toString()}`);
  },

  getSaved: async () => {
    return fetchWithFallback('/saved');
  },

  toggleSave: async (id: string, isSaved: boolean) => {
    const method = isSaved ? 'DELETE' : 'POST';
    return fetchWithFallback(`/saved/${id}`, { method });
  }
};