/**
 * LogicLords — Custom React Hooks
 * Drop-in data hooks that talk to the API service.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

/* ── Generic fetch hook ── */
export function useFetch(fetcher, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const mounted = useRef(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (mounted.current) setData(result);
    } catch (e) {
      if (mounted.current) setError(e.message);
    } finally {
      if (mounted.current) setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mounted.current = true;
    run();
    return () => { mounted.current = false; };
  }, [run]);

  return { data, loading, error, refetch: run };
}

/* ── Members ── */
export function useMembers(params = {}) {
  const key = JSON.stringify(params);
  const { data, loading, error, refetch } = useFetch(
    () => api.members.list(params),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );
  return {
    members: data?.members ?? [],
    total:   data?.total   ?? 0,
    loading, error, refetch,
  };
}

export function useMember(id) {
  const { data, loading, error, refetch } = useFetch(
    () => id ? api.members.get(id) : Promise.resolve(null),
    [id]
  );
  return { member: data?.member ?? null, loading, error, refetch };
}

/* ── Projects ── */
export function useProjects(params = {}) {
  const key = JSON.stringify(params);
  const { data, loading, error, refetch } = useFetch(
    () => api.projects.list(params),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );
  return {
    projects: data?.projects ?? [],
    loading, error, refetch,
  };
}

export function useProject(id) {
  const { data, loading, error, refetch } = useFetch(
    () => id ? api.projects.get(id) : Promise.resolve(null),
    [id]
  );
  return {
    project: data?.project ?? null,
    tasks:   data?.tasks   ?? [],
    loading, error, refetch,
  };
}

/* ── Tasks ── */
export function useTasks(params = {}) {
  const key = JSON.stringify(params);
  const { data, loading, error, refetch } = useFetch(
    () => api.tasks.list(params),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );
  return {
    tasks: data?.tasks ?? [],
    loading, error, refetch,
  };
}

/* ── Auth ── */
export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  /* Restore session from token on mount */
  useEffect(() => {
    if (!api.token.exists()) { setLoading(false); return; }
    api.auth.me()
      .then(d => setUser(d.member))
      .catch(() => api.token.clear())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.auth.login({ email, password });
    api.token.save(data.token);
    setUser(data.member);
    return data.member;
  }, []);

  const signup = useCallback(async (body) => {
    const data = await api.auth.signup(body);
    api.token.save(data.token);
    setUser(data.member);
    return data.member;
  }, []);

  const logout = useCallback(async () => {
    try { await api.auth.logout(); } catch (_) {}
    api.token.clear();
    setUser(null);
  }, []);

  return { user, loading, login, signup, logout, setUser };
}

/* ── Debounce ── */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

/* ── Toast ── */
export function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);
  const remove = useCallback(id => setToasts(p => p.filter(t => t.id !== id)), []);
  return { toasts, add, remove };
}

/* ── Local storage ── */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  const set = useCallback(v => {
    setValue(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch (_) {}
  }, [key]);
  return [value, set];
}
