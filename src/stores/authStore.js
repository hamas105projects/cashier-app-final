// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  login, 
  getProfile, 
  register, 
  updateProfile, 
  changePassword 
} from '../services/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Action: Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await login(email, password);
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          set({ token, user, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Action: Register
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await register(userData);
          set({ isLoading: false });
          return { success: true, data: response.data };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Action: Logout
      logout: () => {
        // Clear state terlebih dahulu
        set({ user: null, token: null, error: null, isLoading: false });
        // Clear localStorage setelahnya
        localStorage.removeItem('token');
      },

      // Action: Check Auth
      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) return false;
        
        try {
          const response = await getProfile();
          const user = response.data;
          set({ user, token });
          return true;
        } catch {
          get().logout();
          return false;
        }
      },

      // Action: Update Profile
      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await updateProfile(profileData);
          const updatedUser = response.data;
          set({ user: updatedUser, isLoading: false });
          return { success: true, user: updatedUser };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Action: Change Password
      changePassword: async (oldPassword, newPassword) => {
        set({ isLoading: true, error: null });
        try {
          await changePassword(oldPassword, newPassword);
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Action: Clear Error
      clearError: () => {
        set({ error: null });
      },

      // Getters
      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      },

      isEmployee: () => {
        const { user } = get();
        return user?.role === 'cashier';
      },

      userName: () => {
        const { user } = get();
        return user?.name || 'User';
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);