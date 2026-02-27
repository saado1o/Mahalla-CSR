import { create } from 'zustand';

interface User {
    id: number;
    username: string;
    email: string;
    is_verified: boolean;
    is_staff: boolean;
    avatar?: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,

    login: (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ token, user, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null, isAuthenticated: false });
    },
}));
