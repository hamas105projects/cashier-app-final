// MainLayout.jsx (setelah perubahan)
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../layouts/Dashboard';
import SalesReport from '../layouts/SalesReport';
import Setting from '../layouts/Setting';
import CatalougeAdmin from '../layouts/CatalougueAdmin';

const MainContent = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      overflow: 'hidden', 
      backgroundColor: '#f7f7f7' }}>
        
      <Sidebar showPage={showPage} setShowPage={setShowPage} />

      {/* Container kanan: header selalu tampil, konten bersyarat */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <Header userName="Budi Santoso" onLogout={handleLogout} />

        {showPage ? (
          <div style={{ padding: '20px', flex: 1, marginTop:'-25px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<CatalougeAdmin />} />
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

export default MainContent;