// MainContent.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Dashboard from '../layouts/Dashboard';
import SalesReport from '../layouts/SalesReport';
import Setting from '../layouts/Setting';
import CatalougeAdmin from '../layouts/catalougues/CatalougueAdmin';
import CatalougeCustomer from '../layouts/catalougues/CatalougueCustomer';
import { useAuthStore } from '../stores/authStore';

// Import SVG sebagai React Component (wajib pakai ?react di Vite)
import DashboardIcon from '../assets/images/dashboard-icon.svg?react';
import MenuIcon from '../assets/images/menu-icon.svg?react';
import SalesIcon from '../assets/images/sales-icon.svg?react';
import SettingIcon from '../assets/images/setting-icon.svg?react';
import CloseIcon from '../assets/images/close-icon.svg?react';

const SidebarComponent = ({ showPage, setShowPage, isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClosePage = () => {
    setShowPage(false);
  };

  const handleMenuClick = (path) => {
    if (!showPage) setShowPage(true);
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  // Filter menu berdasarkan role
  const allMenus = [
    { label: 'Tutup Halaman', icon: CloseIcon, action: handleClosePage, isRoute: false },
    { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard', isRoute: true, role: 'admin' }, // Hanya admin
    { label: 'List Menu', icon: MenuIcon, path: '/menu', isRoute: true, role: 'all' }, // Semua user
    { label: 'Sales Report', icon: SalesIcon, path: '/sales', isRoute: true, role: 'all' }, // Semua user
    { label: 'Setting', icon: SettingIcon, path: '/setting', isRoute: true, role: 'all' }, // Semua user
  ];

  // Filter: jika bukan admin, dashboard tidak muncul
  const menus = allMenus.filter(menu => {
    if (menu.role === 'admin' && !isAdmin) return false;
    return true;
  });

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <h1 style={styles.logoText}>P</h1>
      </div>
      <nav style={styles.nav}>
        {menus.map((menu, idx) => {
          const IconComponent = menu.icon;
          const isMenuActive = menu.isRoute && isActive(menu.path);
          const buttonStyle = isMenuActive ? styles.active : styles.menuItem;

          return (
            <button
              key={idx}
              onClick={() => (menu.isRoute ? handleMenuClick(menu.path) : menu.action())}
              style={buttonStyle}
            >
              <IconComponent style={styles.icon} aria-label={menu.label} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

const MainContent = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(true);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Role dari backend: 'admin' atau 'employee'
  const isAdmin = user?.role === 'admin';
  
  // Nama user dari backend
  const userName = user?.name || 'User';

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      overflow: 'hidden', 
      backgroundColor: '#f7f7f7' }}>
        
      <SidebarComponent 
        showPage={showPage} 
        setShowPage={setShowPage} 
        isAdmin={isAdmin}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <Header userName={userName} onLogout={handleLogout} />

        {showPage ? (
          <div style={{ padding: '20px', flex: 1, marginTop:'-25px' }}>
            <Routes>
              {/* Redirect: admin ke dashboard, employee ke menu */}
              <Route path="/" element={<Navigate to={isAdmin ? "/dashboard" : "/menu"} replace />} />
              
              {/* Dashboard HANYA untuk admin - employee akan di redirect ke menu */}
              <Route 
                path="/dashboard" 
                element={
                  isAdmin ? <Dashboard /> : <Navigate to="/menu" replace />
                } 
              />
              
              {/* Menu: admin pake CatalougeAdmin, employee pake CatalougeCustomer */}
              <Route 
                path="/menu" 
                element={
                  isAdmin ? <CatalougeAdmin /> : <CatalougeCustomer />
                } 
              />
              
              {/* Sales Report dan Setting bisa diakses semua user */}
              <Route path="/sales" element={<SalesReport />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </div>
        ) : (
          <div
            style={{
              padding: '24px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
            }}
          >
            <p>Silakan pilih menu dari sidebar</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '60px',
    backgroundColor: '#fff',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0',
  },
  logo: {
    width: '33px',
    height: '33px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4C3BCF, #3572EF)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  logoText: {
    fontSize: '18px',
    color: 'white',
    margin: 0,
    lineHeight: 1,
  },
  nav: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '34px',
    height: '34px',
    margin: '12px 0',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#5a5c69',
  },
  active: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    margin: '8px 0',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#f0f2ff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#4C3BCF',
  },
  icon: {
    width: '20px',
    height: '20px',
    fill: 'currentColor',
  },
};

export default MainContent;