import { useNavigate, useLocation } from 'react-router-dom';

// Import SVG sebagai React Component (wajib pakai ?react di Vite)
import DashboardIcon from '../assets/images/dashboard-icon.svg?react';
import MenuIcon from '../assets/images/menu-icon.svg?react';
import SalesIcon from '../assets/images/sales-icon.svg?react';
import SettingIcon from '../assets/images/setting-icon.svg?react';
import CloseIcon from '../assets/images/close-icon.svg?react';

const Sidebar = ({ showPage, setShowPage }) => {
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

  const menus = [
    { label: 'Tutup Halaman', icon: CloseIcon, action: handleClosePage, isRoute: false },
    { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard', isRoute: true },
    { label: 'List Menu', icon: MenuIcon, path: '/menu', isRoute: true },
    { label: 'Sales Report', icon: SalesIcon, path: '/sales', isRoute: true },
    { label: 'Setting', icon: SettingIcon, path: '/setting', isRoute: true },
  ];

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

const styles = {
  sidebar: {
    width: '60px',
    backgroundColor: '#fff',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',       // agar konten di tengah horizontal
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
    marginBottom: '40px',       // beri jarak dengan menu
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
    justifyContent: 'center',   // pusatkan ikon di dalam tombol
    alignItems: 'center',
    width: '34px',              // ukuran tetap agar konsisten
    height: '34px',
    margin: '12px 0',            // jarak vertikal antar tombol
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#5a5c69',           // warna ikon default
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
    backgroundColor: '#f0f2ff',  // latar belakang saat aktif
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#4C3BCF',            // warna ikon aktif
  },
  icon: {
    width: '20px',
    height: '20px',
    fill: 'currentColor',        // agar warna mengikuti properti color pada tombol
  },
};

export default Sidebar;