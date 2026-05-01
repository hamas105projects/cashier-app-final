import React, { useState, useEffect, useCallback } from 'react';
import { getTransactions } from '../services/api';
import { useAuthStore } from '../stores/authStore';

const SalesReport = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  
  // Filter states
  const [filters, setFilters] = useState({
    startDate: '',
    finishDate: '',
    category: '',
    orderType: '',
    paymentStatus: ''
  });
  
  const [currentDate, setCurrentDate] = useState('');
  
  // Get user from authStore
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role || 'employee';
  const userId = user?.id || null;

  const normalizeTransactions = (response) => {
    const candidate = response?.data?.data ?? response?.data ?? response?.transactions ?? response?.rows ?? response;
    return Array.isArray(candidate) ? candidate : [];
  };

  const normalizePagination = (response) => {
    const pagination = response?.data?.pagination ?? response?.pagination ?? response?.meta ?? response?.data?.meta ?? {};
    const totalPages = pagination?.totalPages ?? pagination?.total_pages ?? pagination?.pageCount ?? pagination?.pages ?? 1;
    const totalEntries = pagination?.total ?? pagination?.totalItems ?? pagination?.count ?? pagination?.total_count ?? (Array.isArray(response?.data) ? response.data.length : 0) ?? 0;
    return { totalPages, totalEntries };
  };

  // Set current date
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setCurrentDate(`Today, ${formattedDate}`);
  }, []);

  // Fetch transactions
  const fetchTransactions = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      // Build filter object
      const filterParams = {};
      
      // Date filters
      if (filters.startDate) {
        filterParams.startDate = filters.startDate;
      }
      if (filters.finishDate) {
        filterParams.finishDate = filters.finishDate;
      }
      if (filters.paymentStatus && filters.paymentStatus !== '') {
        filterParams.paymentStatus = filters.paymentStatus;
      }
      if (filters.orderType && filters.orderType !== '') {
        filterParams.orderType = filters.orderType;
      }
      
      // Role-based filtering
      console.log('Current userRole:', userRole);
      console.log('Current userId:', userId);
      
      if (userRole === 'employee' && userId) {
        filterParams.userId = userId;
        console.log('Employee mode: adding userId filter', userId);
      } else {
        console.log('Admin mode: NO userId filter');
      }
      
      console.log('Final filterParams:', filterParams);
      
      const response = await getTransactions(page, 10, filterParams);
      console.log('API Response:', response);
      
      const transactionsData = normalizeTransactions(response);
      const { totalPages: fetchedTotalPages, totalEntries: fetchedTotalEntries } = normalizePagination(response);
      
      setTransactions(transactionsData);
      setTotalPages(fetchedTotalPages);
      setTotalEntries(fetchedTotalEntries);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
      setTotalPages(1);
      setTotalEntries(0);
    } finally {
      setLoading(false);
    }
  }, [filters, userRole, userId]);

  useEffect(() => {
    if (userRole) {
      fetchTransactions(currentPage);
    }
  }, [currentPage, filters.startDate, filters.finishDate, filters.paymentStatus, filters.orderType, userRole, userId, fetchTransactions]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    fetchTransactions(1);
  };

  // Handle reset filters
  const handleReset = () => {
    setFilters({
      startDate: '',
      finishDate: '',
      category: '',
      orderType: '',
      paymentStatus: ''
    });
    setCurrentPage(1);
    setTimeout(() => fetchTransactions(1), 100);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `Rp ${amount?.toLocaleString('id-ID') || 0}`;
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        body { margin: 0; background-color: #f9f9fb; }
        select { appearance: none; -webkit-appearance: none; }
        table tr:hover { background-color: #fcfcfc; }
      `}</style>

      {/* Header Area */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Sales Report</h1>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
            Role: {userRole === 'admin' ? 'Administrator' : 'Employee'} 
            {userRole === 'employee' && ' (Viewing only your transactions)'}
            {!userRole && ' (Loading...)'}
          </div>
        </div>
        <span style={styles.headerDate}>{currentDate}</span>
      </div>

      {/* Filter Card */}
      <div style={styles.card}>
        <div style={styles.filterContainer}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Start Date</label>
            <div style={styles.inputWrapper}>
              <input 
                type="date" 
                placeholder="Select date" 
                style={styles.input}
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
              <div style={styles.iconRight}><CalendarIcon /></div>
            </div>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.label}>Finish Date</label>
            <div style={styles.inputWrapper}>
              <input 
                type="date" 
                placeholder="Select date" 
                style={styles.input}
                value={filters.finishDate}
                onChange={(e) => handleFilterChange('finishDate', e.target.value)}
              />
              <div style={styles.iconRight}><CalendarIcon /></div>
            </div>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.label}>Payment Status</label>
            <div style={styles.inputWrapper}>
              <select 
                style={styles.input}
                value={filters.paymentStatus}
                onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div style={styles.iconRight}><ChevronDown /></div>
            </div>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.label}>Order Type</label>
            <div style={styles.inputWrapper}>
              <select 
                style={styles.input}
                value={filters.orderType}
                onChange={(e) => handleFilterChange('orderType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="dine_in">Dine In</option>
                <option value="takeaway">Takeaway</option>
                <option value="delivery">Delivery</option>
              </select>
              <div style={styles.iconRight}><ChevronDown /></div>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.btnSearch} onClick={handleSearch}>Search</button>
            <button style={styles.btnReset} onClick={handleReset}>Reset</button>
            <button style={styles.btnDownload}><DownloadIcon /></button>
          </div>
        </div>
      </div>

      {/* Role Information Banner - hanya tampil jika role sudah diketahui */}
      {userRole === 'employee' && (
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '10px 15px',
          marginBottom: '20px',
          fontSize: '13px',
          color: '#92400e'
        }}>
          ⚠️ You are viewing only your own transactions as an employee. Contact administrator for full access.
        </div>
      )}

      {/* Table Card */}
      <div style={{ ...styles.card, padding: '0px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading transactions...</div>
        ) : (
          <>
            <table style={styles.table}>
              <thead>
                <tr style={styles.theadRow}>
                  <th style={styles.th}>Invoice Number</th>
                  <th style={styles.th}>Order Date</th>
                  <th style={styles.th}>Order Type</th>
                  <th style={styles.th}>Customer Name</th>
                  <th style={styles.th}>Total Amount</th>
                  <th style={styles.th}>Payment Status</th>
                  <th style={styles.th}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction, i) => (
                    <tr key={i} style={styles.tr}>
                      <td style={styles.td}>{transaction.invoiceNumber || '-'}</td>
                      <td style={styles.td}>{formatDate(transaction.transactionDate || transaction.createdAt)}</td>
                      <td style={styles.td}>{transaction.orderType?.replace('_', ' ') || '-'}</td>
                      <td style={styles.td}>{transaction.customerName || '-'}</td>
                      <td style={styles.td}>{formatCurrency(transaction.grandTotal)}</td>
                      <td style={styles.td}>
                        <span style={{
                          backgroundColor: getStatusColor(transaction.paymentStatus),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '20px',
                          fontSize: '12px'
                        }}>
                          {transaction.paymentStatus || '-'}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <a href="#" style={{ color: '#3b82f6' }}><ExternalLinkIcon /></a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Area */}
            <div style={styles.pagination}>
              <div style={styles.showEntries}>
                Show: 
                <select style={styles.entrySelect} value={10} readOnly>
                  <option>10</option>
                </select>
                Entries (Total: {totalEntries})
              </div>
              <div style={styles.pageControls}>
                <button 
                  style={styles.pageBtnInactive}
                  onClick={() => currentPage > 1 && fetchTransactions(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                  let pageNum = idx + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + idx;
                  }
                  if (pageNum <= totalPages) {
                    return (
                      <button
                        key={idx}
                        style={currentPage === pageNum ? styles.pageBtnActive : styles.pageBtnInactive}
                        onClick={() => fetchTransactions(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && <span style={{ padding: '0 5px' }}>...</span>}
                <button 
                  style={styles.pageBtnNext}
                  onClick={() => currentPage < totalPages && fetchTransactions(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Icons (sama seperti sebelumnya)
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>;
const DownloadIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const ExternalLinkIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

// Styles (CSS asli yang pertama, tidak diubah)
const styles = {
  wrapper: {
    padding: '30px',
    fontFamily: '"Inter", sans-serif',
    color: '#333',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px'
  },
  title: { fontSize: '24px', fontWeight: 'bold', margin: 0 },
  headerDate: { color: '#888', fontSize: '14px' },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    marginBottom: '20px'
  },
  filterContainer: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  filterGroup: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: '150px' },
  label: { fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#555' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff'
  },
  iconRight: { position: 'absolute', right: '12px', color: '#94a3b8', pointerEvents: 'none' },
  buttonGroup: { display: 'flex', gap: '10px' },
  btnSearch: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  btnReset: {
    backgroundColor: '#64748b',
    color: '#fff',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  btnDownload: {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    padding: '8px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#64748b'
  },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  theadRow: { backgroundColor: '#f8fafc' },
  th: { padding: '15px', textAlign: 'left', fontSize: '13px', color: '#64748b', borderBottom: '1px solid #f1f5f9' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '15px', fontSize: '14px' },
  pagination: { display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center', flexWrap: 'wrap', gap: '10px' },
  showEntries: { fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' },
  entrySelect: { padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' },
  pageControls: { display: 'flex', gap: '5px', flexWrap: 'wrap' },
  pageBtnActive: { width: '32px', height: '32px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '6px', cursor: 'pointer' },
  pageBtnInactive: { width: '32px', height: '32px', border: 'none', backgroundColor: '#f1f5f9', color: '#64748b', borderRadius: '6px', cursor: 'pointer' },
  pageBtnNext: { width: '32px', height: '32px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '6px', cursor: 'pointer' },
};

export default SalesReport;