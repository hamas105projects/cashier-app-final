import avatarImage from '../assets/images/avatar.png';
import ExitIcon from '../assets/images/exit-icon.svg?react'; // Added import

const Header = ({ userName = 'Admin User', onLogout }) => {
  return (
    <header style={styles.header}>
      <input type="text" placeholder="Cari produk..." style={styles.search} />
      <div style={styles.userInfo}>
        <img src={avatarImage} alt="avatar" style={styles.avatar} />
        <span style={styles.userName}>{userName}</span>
        <button
          onClick={onLogout}
          style={styles.logoutBtn}
          aria-label="Logout"
        >
          <ExitIcon style={styles.icon} />
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0e0e0',
  },
  search: {
    width: '300px',
    padding: '8px 12px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  userName: {
    fontWeight: '500',
    color: '#333',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
  },
  icon: {
    width: '20px',
    height: '20px',
    fill: '#666', // Adjust color as needed
  },
};

export default Header;