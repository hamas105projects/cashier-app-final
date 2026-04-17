import React from 'react';

const SalesReport = () => {
  // Data Hardcoded
  const tableData = Array(10).fill({
    noOrder: 'ORDR#1234567890',
    orderDate: 'Rabu, 18/09/2024 12:30:00',
    orderType: 'Dine-in',
    category: 'Foods',
    customerName: 'Anisa'
  });

  return (
    <div style={styles.wrapper}>
      {/* Internal CSS */}
      <style>{`
        body { margin: 0; background-color: #f9f9fb; }
        select { appearance: none; -webkit-appearance: none; }
        table tr:hover { background-color: #fcfcfc; }
      `}</style>

      {/* Header Area */}
      <div style={styles.header}>
        <h1 style={styles.title}>Sales Report</h1>
        <span style={styles.headerDate}>Today, Monday 30 September 2024</span>
      </div>

      {/* Filter Card */}
      <div style={styles.card}>
        <div style={styles.filterContainer}>
          {[
            { label: 'Start', placeholder: 'Select date', type: 'date' },
            { label: 'Finish', placeholder: 'Select date', type: 'date' },
            { label: 'Category', placeholder: 'Select category', type: 'select' },
            { label: 'Order Type', placeholder: 'Select order type', type: 'select' },
          ].map((item, idx) => (
            <div key={idx} style={styles.filterGroup}>
              <label style={styles.label}>{item.label}</label>
              <div style={styles.inputWrapper}>
                {item.type === 'select' ? (
                  <select style={styles.input} defaultValue="">
                    <option value="" disabled hidden>{item.placeholder}</option>
                    <option>Option 1</option>
                  </select>
                ) : (
                  <input type="text" placeholder={item.placeholder} style={styles.input} readOnly />
                )}
                <div style={styles.iconRight}>
                  {item.type === 'select' ? <ChevronDown /> : <CalendarIcon />}
                </div>
              </div>
            </div>
          ))}

          <div style={styles.buttonGroup}>
            <button style={styles.btnSearch}>Search</button>
            <button style={styles.btnDownload}><DownloadIcon /></button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div style={{ ...styles.card, padding: '0px' }}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>No Order</th>
              <th style={styles.th}>Order Date</th>
              <th style={styles.th}>Order Type</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Customer Name</th>
              <th style={styles.th}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} style={styles.tr}>
                <td style={styles.td}>{row.noOrder}</td>
                <td style={styles.td}>{row.orderDate}</td>
                <td style={styles.td}>{row.orderType}</td>
                <td style={styles.td}>{row.category}</td>
                <td style={styles.td}>{row.customerName}</td>
                <td style={styles.td}>
                  <a href="#" style={{ color: '#3b82f6' }}><ExternalLinkIcon /></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Area */}
        <div style={styles.pagination}>
          <div style={styles.showEntries}>
            Show: 
            <select style={styles.entrySelect}>
              <option>10</option>
            </select>
            Entries
          </div>
          <div style={styles.pageControls}>
            <button style={styles.pageBtnInactive}>&lt;</button>
            <button style={styles.pageBtnActive}>1</button>
            <button style={styles.pageBtnInactive}>2</button>
            <button style={styles.pageBtnInactive}>3</button>
            <button style={styles.pageBtnInactive}>...</button>
            <button style={styles.pageBtnNext}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Icons (SVG) ---
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>;
const DownloadIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const ExternalLinkIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

// --- Styles (CSS-in-JS) ---
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
    alignItems: 'flex-end'
  },
  filterGroup: { flex: 1, display: 'flex', flexDirection: 'column' },
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
  pagination: { display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' },
  showEntries: { fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' },
  entrySelect: { padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' },
  pageControls: { display: 'flex', gap: '5px' },
  pageBtnActive: { width: '32px', height: '32px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '6px', cursor: 'pointer' },
  pageBtnInactive: { width: '32px', height: '32px', border: 'none', backgroundColor: '#f1f5f9', color: '#64748b', borderRadius: '6px', cursor: 'pointer' },
  pageBtnNext: { width: '32px', height: '32px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '6px', cursor: 'pointer' },
};

export default SalesReport;