/**
 * LogicLords API Service
 * Centralised fetch layer — swap BASE_URL for production.
 *
 * Usage:
 *   import api from './services/api';
 *   const { members } = await api.members.list({ role: 'AI/ML' });
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'https://logiclords-backend.onrender.com/api';

/* ── Core fetch wrapper ── */
async function request(path, options = {}) {
  const token = localStorage.getItem('ll_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

/* Multipart (file upload) request */
async function upload(path, formData) {
  const token = localStorage.getItem('ll_token');
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

/* ── Auth ── */
const auth = {
  signup:  (body)   => request('/auth/signup',          { method: 'POST', body: JSON.stringify(body) }),
  login:   (body)   => request('/auth/login',           { method: 'POST', body: JSON.stringify(body) }),
  me:      ()       => request('/auth/me'),
  logout:  ()       => request('/auth/logout',          { method: 'POST' }),
  changePassword: (body) => request('/auth/change-password', { method: 'PATCH', body: JSON.stringify(body) }),
};

/* ── Members ── */
const members = {
  list:       (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/members${qs ? `?${qs}` : ''}`);
  },
  get:        (id)   => request(`/members/${id}`),
  update:     (id, body) => request(`/members/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove:     (id)   => request(`/members/${id}`,     { method: 'DELETE' }),
  uploadAvatar: (id, file) => {
    const fd = new FormData();
    fd.append('avatar', file);
    return upload(`/members/${id}/avatar`, fd);
  },
  stats:      ()     => request('/members/stats/overview'),
};

/* ── Projects ── */
const projects = {
  list:   (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/projects${qs ? `?${qs}` : ''}`);
  },
  get:    (id)   => request(`/projects/${id}`),
  create: (body) => request('/projects',      { method: 'POST',   body: JSON.stringify(body) }),
  update: (id, body) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id)   => request(`/projects/${id}`, { method: 'DELETE' }),
  stats:  ()     => request('/projects/stats/overview'),
};

/* ── Tasks ── */
const tasks = {
  list:     (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/tasks${qs ? `?${qs}` : ''}`);
  },
  get:      (id)   => request(`/tasks/${id}`),
  create:   (body) => request('/tasks',          { method: 'POST',  body: JSON.stringify(body) }),
  update:   (id, body) => request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  setStatus: (id, status) => request(`/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  comment:  (id, text)   => request(`/tasks/${id}/comments`, { method: 'POST', body: JSON.stringify({ text }) }),
  reorder:  (updates)    => request('/tasks/reorder/bulk',   { method: 'PATCH', body: JSON.stringify(updates) }),
  remove:   (id)   => request(`/tasks/${id}`, { method: 'DELETE' }),
};

/* ── Token helpers ── */
const token = {
  save:   (t) => localStorage.setItem('ll_token', t),
  clear:  ()  => localStorage.removeItem('ll_token'),
  get:    ()  => localStorage.getItem('ll_token'),
  exists: ()  => !!localStorage.getItem('ll_token'),
};

const api = { auth, members, projects, tasks, token };
export default api;
