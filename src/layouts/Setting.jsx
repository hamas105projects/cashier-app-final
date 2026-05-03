import React, { useState, useEffect } from 'react';
import avatarImage from '../assets/images/avatar.png';
import { useAuthStore } from '../stores/authStore';
import { updateProfile, changePassword } from '../services/api';

const Setting = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Ambil user dari store
  const { user } = useAuthStore();
  
  // State untuk form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  // State untuk change password
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load data user ke form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  // Handle update profile
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const response = await updateProfile({
        name: formData.name,
        phone: formData.phone
      });
      
      if (response.status === 'success') {
        // Refresh user data di store
        const { getProfile } = await import('../services/api');
        const profileResponse = await getProfile();
        if (profileResponse.status === 'success') {
          useAuthStore.setState({ user: profileResponse.data });
        }
        
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    } catch (error) {
      setMessage({ text: error.message || 'Failed to update profile', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle change password
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: 'New password and confirm password do not match', type: 'error' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      await changePassword(passwordData.oldPassword, passwordData.newPassword);
      
      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordModal(false);
      
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      setMessage({ text: error.message || 'Failed to change password', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const userStatus = user?.deletedAt ? 'Inactive' : 'Active';
  const userRole = user?.role === 'admin' ? 'Admin' : 'Employee';

  // Styles
  const styles = {
    container: {
      maxWidth: '90%',
      marginLeft: '10px',
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
    inputReadOnly: {
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: '#f3f4f6',
      color: '#6b7280',
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
    },
    message: {
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
    },
    messageSuccess: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0',
    },
    messageError: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fecaca',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      width: '400px',
      maxWidth: '90%',
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px',
    },
    modalButtons: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
      marginTop: '20px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Settings</h1>

      {/* Tampilkan pesan */}
      {message.text && (
        <div style={{
          ...styles.message,
          ...(message.type === 'success' ? styles.messageSuccess : styles.messageError)
        }}>
          {message.text}
        </div>
      )}

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
            <label style={styles.label}>Name</label>
            <input 
              style={styles.input} 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input 
              style={styles.inputReadOnly} 
              type="text" 
              value={formData.email} 
              readOnly 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input 
              style={styles.input} 
              type="text" 
              name="phone"
              value={formData.phone || ''} 
              onChange={handleInputChange}
              placeholder="No phone"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <input 
              style={styles.inputReadOnly} 
              type="text" 
              value={userRole} 
              readOnly 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <input 
              style={styles.inputReadOnly} 
              type="text" 
              value={userStatus} 
              readOnly 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Language</label>
            <select style={styles.select} defaultValue="English">
              <option>English</option>
              <option>Indonesia</option>
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
          <input style={styles.inputReadOnly} type="password" value="**********" readOnly />
        </div>
        <button 
          style={{...styles.btn, ...styles.btnPrimary, marginTop: '10px'}}
          onClick={() => setShowPasswordModal(true)}
        >
          Change Password
        </button>
      </section>

      <hr style={styles.divider} />

      {/* Section Appearance */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Appearance</h2>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Preferance Mode</label>
            <select style={styles.select} defaultValue="Light Mode">
              <option>Light Mode</option>
              <option>Dark Mode</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Font Size</label>
            <select style={styles.select} defaultValue="16 px">
              <option>14 px</option>
              <option>16 px</option>
              <option>18 px</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Zoom Display</label>
            <select style={styles.select} defaultValue="100 (Normal)">
              <option>90%</option>
              <option>100 (Normal)</option>
              <option>110%</option>
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
          onClick={handleUpdateProfile}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Modal Change Password */}
      {showPasswordModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Change Password</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Old Password</label>
              <input 
                style={styles.input} 
                type="password" 
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <input 
                style={styles.input} 
                type="password" 
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <input 
                style={styles.input} 
                type="password" 
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            
            <div style={styles.modalButtons}>
              <button 
                style={{...styles.btn, ...styles.btnOutline}}
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button 
                style={{...styles.btn, ...styles.btnPrimary}}
                onClick={handleChangePassword}
                disabled={isLoading}
              >
                {isLoading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;