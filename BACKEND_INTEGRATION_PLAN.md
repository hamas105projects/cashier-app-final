# Backend Integration Plan for Cashier App Frontend

## Project Overview
This is a React (Vite) frontend for a cashier management application with:
- **Authentication**: Login, Register, Forgot Password (src/pages/)
- **Protected Routes**: Using PrivateRoute hook (src/hooks/)
- **Layouts/Pages**: Dashboard, CatalogueAdmin, SalesReport, Setting (src/layouts/)
- **Components**: Header, Sidebar, Charts, etc.
- **Routing**: React Router in App.jsx
- **State Management**: Likely Context API (src/context/)

**Goal**: Integrate with backend APIs for full CRUD operations on users, products (catalogue), sales/transactions, reports, settings.

## Current & Proposed Folder Structure

```
cashier-app-final/
├── public/
│   └── images/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── BackgroundAuth.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── dashboard/           # HeaderDashboard.jsx, BarChartStats.jsx
│   ├── context/                 # Existing (to be replaced?)
│   ├── hooks/                   # PrivateRoute.jsx
│   ├── layouts/                 # Dashboard.jsx, CatalogueAdmin.jsx, etc.
│   ├── pages/                   # Login.jsx, Register.jsx, etc.
│   ├── services/                # ← NEW: api.js
│   └── stores/                  # ← NEW: authStore.js, appStore.js
├── .env                        # ← NEW
├── package.json
└── vite.config.js
```

## 1. Backend Requirements
Assume REST API (e.g., Node.js/Express, Laravel, etc.) with JWT auth. Required endpoints:

### Authentication
```
POST /api/auth/login     {email, password} → {token, user}
POST /api/auth/register  {name, email, password, role} → {token, user}
POST /api/auth/forgot-password {email} → {message}
POST /api/auth/verify-token
GET  /api/auth/me → user profile
```

### Catalogue (Products)
```
GET   /api/products → list products [{id, name, price, stock, category}]
GET   /api/products/:id
POST  /api/products → create
PUT   /api/products/:id → update
DELETE /api/products/:id
GET   /api/categories
```

### Sales/Transactions
```
GET   /api/transactions → sales list [{id, items[], total, date, customer}]
GET   /api/transactions/:id
POST  /api/transactions → create sale (cart items)
GET   /api/transactions/report?start=YYYY-MM-DD&end=YYYY-MM-DD → summary
```

### Dashboard Stats
```
GET /api/stats → {totalSales, totalProducts, lowStock, recentTransactions}
```

### Settings/Users (Admin)
```
GET   /api/users → admin user list
POST  /api/users → create user
PUT   /api/users/:id
DELETE /api/users/:id
PUT   /api/settings → update app settings
```

## 2. Frontend Changes Needed

### a. API Service Layer (Native Fetch)
Create `src/services/api.js`:
```js
// Native fetch API service (no external HTTP client needed)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};

// Auth examples
export const login = (data) => apiCall('/auth/login', { 
  method: 'POST', 
  body: JSON.stringify(data) 
});
export const register = (data) => apiCall('/auth/register', { 
  method: 'POST', 
  body: JSON.stringify(data) 
});
export const getMe = () => apiCall('/auth/me');

// Products examples
export const getProducts = () => apiCall('/products');
export const createProduct = (data) => apiCall('/products', { 
  method: 'POST', 
  body: JSON.stringify(data) 
});
// Add more for transactions, stats, etc.
```

### b. Zustand Stores
Create `src/stores/` folder:
- `authStore.js`:
```js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, getMe } from '../services/api.js';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const { token, user } = await login(credentials);
          localStorage.setItem('token', token);
          set({ token, user });
        } catch (error) {
          // handle error
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
    }),
    { name: 'auth-storage' }
  )
);
```
- `appStore.js`: cart, products, settings (use persist middleware)

### c. Update Existing Components/Layouts
- **Login/Register (src/pages/)**: Use apiCall + authStore.login()
- **PrivateRoute (src/hooks/)**: Validate token with getMe()
- **Dashboard**: Fetch stats with apiCall('/stats')
- **CatalogueAdmin**: CRUD products
- **SalesReport**: Fetch transactions
- **Setting**: User/settings management

### d. Add New Hooks/Components
- `useApi.js`: Custom hook wrapping apiCall
- Cart service
- Toasts (react-hot-toast), loaders, react-hook-form

### e. Environment Config
Add `.env`:
```
VITE_API_URL=http://localhost:3001/api
```

## 3. Implementation Steps

1. **Setup Dependencies**:
   ```
   npm install zustand react-hook-form
   ```

2. **Create API Services** (`src/services/api.js`, etc.)

3. **Create Zustand Stores** (`src/stores/`)

4. **Provider Setup** in `main.jsx`:
   Wrap App with store providers.

5. **Integrate Auth Pages**: Update forms with apiCall + zustand

6. **Update Layouts**: Replace mocks with real API calls

7. **POS/Cart Flow**: Add Sales layout

8. **Testing/Polish**: Error handling, deploy

## 4. Potential Challenges
- Token refresh logic
- Real-time sales (Socket.io)
- Image uploads for products
- Role-based access
- PWA offline support

## 5. Backend Recommendations
- Prisma/PostgreSQL DB
- JWT with refresh tokens
- Rate limiting, CORS for frontend

**Status**: Ready for implementation. Start with API service + auth integration.
*Updated: Uses native fetch + Zustand*
