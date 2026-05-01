// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// API Call utama dengan handling token
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
    ...options,
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (parseError) {
    console.warn(`Failed to parse JSON from ${endpoint}:`, parseError);
    data = null;
  }

  if (!response.ok) {
    const errorMessage = data?.message || data?.error || `API Error: ${response.status}`;
    throw new Error(errorMessage);
  }
  
  return data;
};

// ========== HEALTH & ROOT ==========
export const checkHealth = () => apiCall('/health');
export const checkDB = () => apiCall('/test-db');
export const getRoot = () => apiCall('/');

// ========== AUTHENTICATION ==========
export const login = (email, password) => 
  apiCall('/users/login', { 
    method: 'POST', 
    body: JSON.stringify({ email, password }) 
  });

export const register = (userData) => 
  apiCall('/users/register', { 
    method: 'POST', 
    body: JSON.stringify(userData) 
  });

export const getProfile = () => 
  apiCall('/users/profile');

export const updateProfile = (data) => 
  apiCall('/users/profile', { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });

export const changePassword = (oldPassword, newPassword) => 
  apiCall('/users/change-password', { 
    method: 'POST', 
    body: JSON.stringify({ oldPassword, newPassword }) 
  });

// ========== USERS (Admin only) ==========
export const getUsers = (page = 1, limit = 10, search = '') => {
  let url = `/users?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  return apiCall(url);
};

export const getUserById = (userId) => 
  apiCall(`/users/${userId}`);

export const updateUser = (userId, data) => 
  apiCall(`/users/${userId}`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });

export const deleteUser = (userId) => 
  apiCall(`/users/${userId}`, { 
    method: 'DELETE' 
  });

// ========== PRODUCTS (Public) ==========
export const getProducts = (page = 1, limit = 20, search = '', category = '') => {
  let url = `/products?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  if (category) url += `&category=${category}`;
  return apiCall(url);
};

export const getProductById = (id) => 
  apiCall(`/products/${id}`);

export const getProductsByCategory = (category, page = 1) => 
  apiCall(`/products/category/${category}?page=${page}`);

// ========== PRODUCTS (Admin only) ==========
export const createProduct = async (formData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Create product failed');
  return data;
};

export const updateProduct = async (id, formData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Update product failed');
  return data;
};

export const deleteProduct = (id) => 
  apiCall(`/products/${id}`, { method: 'DELETE' });

// ========== TRANSACTIONS ==========
export const createTransaction = (transactionData) => 
  apiCall('/transactions', { 
    method: 'POST', 
    body: JSON.stringify(transactionData) 
  });

// PERBAIKI INI - Support semua filter
// services/api.js - CARI function getTransactions, ganti dengan ini:

export const getTransactions = (page = 1, limit = 10, filters = {}) => {
  let url = `/transactions?page=${page}&limit=${limit}`;
  
  // Date filters
  if (filters.startDate) {
    url += `&startDate=${filters.startDate}`;
  }
  if (filters.finishDate) {
    url += `&finishDate=${filters.finishDate}`;
  }
  
  // Status filters
  if (filters.paymentStatus && filters.paymentStatus !== '') {
    url += `&paymentStatus=${filters.paymentStatus}`;
  }
  
  // Order type filter
  if (filters.orderType && filters.orderType !== '') {
    url += `&orderType=${filters.orderType}`;
  }
  
  // User filter (untuk employee)
  if (filters.userId) {
    url += `&userId=${filters.userId}`;
  }
  
  console.log('GET Transactions URL:', url);
  return apiCall(url);
};

export const getTransactionById = (id) => 
  apiCall(`/transactions/${id}`);

export const getTransactionByInvoice = (invoiceNumber) => 
  apiCall(`/transactions/invoice/${invoiceNumber}`);

export const updatePaymentStatus = (id, paymentStatus) => 
  apiCall(`/transactions/${id}/payment-status`, { 
    method: 'PUT', 
    body: JSON.stringify({ paymentStatus }) 
  });

export const cancelTransaction = (id) => 
  apiCall(`/transactions/${id}/cancel`, { method: 'DELETE' });

// ========== REPORTS ==========
export const getDailyReport = async (startDate, endDate) => 
  apiCall(`/reports/daily?startDate=${startDate}&endDate=${endDate}`);

export const getMonthlyReport = async (month) => {
  const year = new Date().getFullYear();
  return apiCall(`/reports/monthly?month=${year}-${month}`);
};

// ========== DASHBOARD STATS ==========
export const getDashboardStats = async () => {
  const response = await getTransactions(1, 1000, { paymentStatus: 'paid' });
  return response;
};

// ========== CATEGORIES ==========
export const getCategories = () => 
  apiCall('/products/categories');

// ========== EXPORT DATA ==========
export const exportTransactions = (format = 'pdf', startDate, endDate) => {
  let url = `/transactions/export?format=${format}`;
  if (startDate) url += `&start=${startDate}`;
  if (endDate) url += `&end=${endDate}`;
  return apiCall(url);
};