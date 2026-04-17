import React, { useState } from 'react';
import avatarImage from '../assets/images/avatar.png';

const Setting = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Data Hardcoded
  const userData = {
    email: "johndoe@gmail.com",
    username: "John Doe",
    role: "Admin",
    status: "Active",
    language: "English",
    preferenceMode: "Light Mode",
    fontSize: "16 px",
    zoomDisplay: "100 (Normal)"
  };

  // Gabungan CSS dalam satu objek styles
  const styles = {
    container: {
      maxWidth: '90%',
      marginLeft:'10px',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      color: '#333',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '25px',
    },
    section: {
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '20px',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '25px',
    },
    profileImg: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      backgroundColor: '#ddd',
    },
    profileActions: {
      display: 'flex',
      gap: '10px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      color: '#666',
    },
    input: {
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white',
      outline: 'none',
    },
    select: {
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      backgroundSize: '1em',
    },
    btn: {
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '12px',
      cursor: 'pointer',
      border: '1px solid transparent',
      transition: '0.2s',
    },
    btnPrimary: {
      backgroundColor: '#4379EE',
      color: 'white',
    },
    btnOutline: {
      backgroundColor: 'transparent',
      borderColor: '#4379EE',
      color: '#4379EE',
    },
    divider: {
      border: '0',
      borderTop: '1px solid #eee',
      margin: '30px 0',
    },
    saveButton: {
      marginTop: '20px',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: isHovered ? '#3572EF' : '#E5E7EB',
      color: isHovered ? 'white' : '#4B5563',
      width: 'fit-content'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Settings</h1>

      {/* Section Account */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Account</h2>
        <div style={styles.profileHeader}>
          <img 
            src={avatarImage}
            alt="Profile" 
            style={styles.profileImg} 
          />
          <div style={styles.profileActions}>
            <button style={{...styles.btn, ...styles.btnPrimary}}>Change Picture</button>
            <button style={{...styles.btn, ...styles.btnOutline}}>Delete Picture</button>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="text" value={userData.email} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input style={styles.input} type="text" value={userData.username} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <input style={styles.input} type="text" value={userData.role} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <input style={styles.input} type="text" value={userData.status} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Language</label>
            <select style={styles.select} defaultValue={userData.language}>
              <option>{userData.language}</option>
            </select>
          </div>
        </div>
      </section>

      <hr style={styles.divider} />

      {/* Section Password */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Password</h2>
        <div style={{ ...styles.formGroup, maxWidth: '340px' }}>
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" value="**********" readOnly />
        </div>
        <button style={{...styles.btn, ...styles.btnPrimary, marginTop: '10px'}}>Change Password</button>
      </section>

      <hr style={styles.divider} />

      {/* Section Appearance */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Appearance</h2>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Preferance Mode</label>
            <select style={styles.select} defaultValue={userData.preferenceMode}>
              <option>{userData.preferenceMode}</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Font Size</label>
            <select style={styles.select} defaultValue={userData.fontSize}>
              <option>{userData.fontSize}</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Zoom Display</label>
            <select style={styles.select} defaultValue={userData.zoomDisplay}>
              <option>{userData.zoomDisplay}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Button Save Changes */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button 
          style={styles.saveButton}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Setting;