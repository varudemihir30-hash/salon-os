import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Initial seed users (stored to localStorage on first load) ─────────────────
const SEED_USERS = [
  { id: 1, name: 'Salon Owner', email: 'owner@salon.com', password: 'owner123', role: 'owner' },
  { id: 2, name: 'Salon Manager', email: 'manager@salon.com', password: 'manager123', role: 'manager' },
  { id: 3, name: 'Receptionist', email: 'reception@salon.com', password: 'reception123', role: 'receptionist' },
];

const AUTH_KEY = 'salonos_auth';
const USERS_KEY = 'salonos_users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Seed users if first time
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      setUsers(SEED_USERS);
    } else {
      setUsers(JSON.parse(stored));
    }

    // Restore session
    const session = localStorage.getItem(AUTH_KEY);
    if (session) setCurrentUser(JSON.parse(session));
  }, []);

  const login = (email, password) => {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const found = all.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      const { password: _p, ...safe } = found;
      localStorage.setItem(AUTH_KEY, JSON.stringify(safe));
      setCurrentUser(safe);
      return { ok: true };
    }
    return { ok: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setCurrentUser(null);
  };

  const addUser = (user) => {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const next = [...all, { ...user, id: Date.now() }];
    localStorage.setItem(USERS_KEY, JSON.stringify(next));
    setUsers(next);
  };

  const updateUser = (id, updates) => {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const next = all.map(u => u.id === id ? { ...u, ...updates } : u);
    localStorage.setItem(USERS_KEY, JSON.stringify(next));
    setUsers(next);
  };

  const deleteUser = (id) => {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const next = all.filter(u => u.id !== id);
    localStorage.setItem(USERS_KEY, JSON.stringify(next));
    setUsers(next);
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, logout, addUser, updateUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
