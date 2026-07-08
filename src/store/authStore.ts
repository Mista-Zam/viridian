import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: { email: string; username: string; name: string; password: string; role: UserRole }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const demoUser: User = {
  id: 'u1',
  email: 'farmer@viridian.com',
  username: 'Zaldy Mar',
  name: 'Zaldy Mar Ybañez',
  role: 'farmer',
  verified: true,
  phone: '+63 912 345 6789',
  gender: 'male',
  dob: '2005-01-26',
  createdAt: '2026-01-01',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (email, _password) => {
        if (email && _password) {
          set({ user: { ...demoUser, email }, isLoggedIn: true });
          return true;
        }
        return false;
      },
      register: (data) => {
        const newUser: User = {
          id: `u${Date.now()}`,
          email: data.email,
          username: data.username,
          name: data.name,
          role: data.role,
          verified: false,
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isLoggedIn: true });
        return true;
      },
      logout: () => set({ user: null, isLoggedIn: false }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    { name: 'viridian-auth' }
  )
);
