import { useState, useEffect } from 'react';
import billIcon from '../../assets/images/billDashboard.png';
import walletIcon from '../../assets/images/walletDashboard.png';
import listIcon from '../../assets/images/listDashboard.png';
import foodIcon from '../../assets/images/foodDashboard.png';
import beverageIcon from '../../assets/images/beverageDashboard.png';
import dessertIcon from '../../assets/images/dessertDashboard.png';
import expandIcon from '../../assets/images/expand-arrows.png';
import { getMonthlyReport } from '../../services/api';

const HeaderDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalOmzet: 0,
    allMenuOrders: 0,
    foods: 0,
    beverages: 0,
    desserts: 0,
    loading: true
  });

  // Format tanggal dengan hari
  const today = new Date();
  const formattedDate = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Fetch data dashboard dari API report yang baru
  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      if (!isMounted) return;
      setDashboardData(prev => ({ ...prev, loading: true }));
      
      try {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        

        // Panggil API report monthly yang baru
        const response = await getMonthlyReport(month);
        console.log('📊 Dashboard API Report Response:', response);
        
        // Ambil data dari response, siapHadapi format yang tidak konsisten
        const reportData = response && typeof response === 'object'
          ? (response.data?.data || response.data || response)
          : {};

        const totalOrders = Number(reportData?.total_transactions ?? 0);
        const foodsSold = Number(reportData?.foods_sold ?? 0);
        const beveragesSold = Number(reportData?.beverages_sold ?? 0);
        const dessertsSold = Number(reportData?.desserts_sold ?? 0);
        const totalProductsSold = Number(reportData?.total_products_sold ?? 0);
        const totalRevenue = Number(reportData?.total_revenue ?? 0);

        if (isMounted) {
          setDashboardData({
            totalOrders,
            totalOmzet: totalRevenue,
            allMenuOrders: totalProductsSold,
            foods: foodsSold,
            beverages: beveragesSold,
            desserts: dessertsSold,
            loading: false
          });
        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (isMounted) {
          setDashboardData(prev => ({ ...prev, loading: false }));
        }
      }
    };
    
    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Data untuk cards
  const cardsData = [
    { id: 1, title: 'Total Order', icon: billIcon, amount: dashboardData.totalOrders, isWide: true, hasExpand: false, formatAsCurrency: false },
    { id: 2, title: 'Total Omzet', icon: walletIcon, amount: dashboardData.totalOmzet, isWide: true, hasExpand: false, formatAsCurrency: true },
    { id: 3, title: 'All Menu Orders', icon: listIcon, amount: dashboardData.allMenuOrders, isWide: false, hasExpand: false, formatAsCurrency: false },
    { id: 4, title: 'Foods', icon: foodIcon, amount: dashboardData.foods, isWide: false, hasExpand: true, formatAsCurrency: false },
    { id: 5, title: 'Beverages', icon: beverageIcon, amount: dashboardData.beverages, isWide: false, hasExpand: true, formatAsCurrency: false },
    { id: 6, title: 'Desserts', icon: dessertIcon, amount: dashboardData.desserts, isWide: false, hasExpand: true, formatAsCurrency: false },
  ];

  const formatAmount = (amount, isCurrency) => {
    const value = Number(amount) || 0;
    if (isCurrency) return `Rp ${value.toLocaleString('id-ID')}`;
    return value.toLocaleString('id-ID');
  };

  // Styles
  const styles = {
    dashboardContainer: {
      maxWidth: '100%',
      padding: '12px 16px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },
    dashboardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '8px',
    },
    dashboardHeaderH2: {
      margin: 0,
      fontSize: '20px',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    date: {
      fontSize: '12px',
      color: '#4b5563',
      background: '#f3f4f6',
      padding: '4px 12px',
      borderRadius: '40px',
      fontWeight: 500,
    },
    cardsScrollContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '12px',
      overflowX: 'auto',
      paddingBottom: '8px',
      scrollbarWidth: 'thin',
    },
    card: {
      flexShrink: 0,
      backgroundColor: 'white',
      borderRadius: '14px',
      padding: '0 10px',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #eef2f6',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.2s ease',
    },
    cardWide: {
      width: '186px',
    },
    cardNormal: {
      width: '140px',
    },
    cardContent: {
      flex: 1,
      padding: '12px 11px',
    },
    cardTitle: {
      margin: '0 0 8px 0',
      fontSize: '11px',
      fontWeight: 600,
      color: '#4b5563',
      letterSpacing: '0.2px',
      textAlign: 'left',
    },
    cardStats: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    cardIcon: {
      width: '24px',
      height: '24px',
      objectFit: 'contain',
    },
    cardAmount: {
      fontSize: '14px',
      fontWeight: 700,
      color: '#111827',
      lineHeight: 1.2,
      wordBreak: 'break-word',
    },
    smallAmount: {
      fontSize: '14px',
    },
    expandIconWrapper: {
      margin: '0 8px 6px 0',
      textAlign: 'right',
    },
    expandIcon: {
      width: '12px',
      height: '12px',
      cursor: 'pointer',
      opacity: 0.7,
      transition: 'opacity 0.2s',
    },
    skeletonCard: {
      backgroundColor: '#f9fafb',
    },
    skeletonTitle: {
      height: '11px',
      width: '60%',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      marginBottom: '12px',
    },
    skeletonIcon: {
      width: '24px',
      height: '24px',
      backgroundColor: '#e5e7eb',
      borderRadius: '8px',
    },
    skeletonAmount: {
      height: '14px',
      width: '50%',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
    },
    mediaQuery: {
      '@media (max-width: 640px)': {
        dashboardContainer: { padding: '8px 12px' },
        cardWide: { width: '150px' },
        cardNormal: { width: '125px' },
        cardTitle: { fontSize: '10px' },
        cardAmount: { fontSize: '14px' },
        smallAmount: { fontSize: '12px' },
        cardIcon: { width: '20px', height: '20px' },
      }
    }
  };

  // Jika loading, tampilkan skeleton
  if (dashboardData.loading) {
    return (
      <div style={styles.dashboardContainer}>
        <div style={styles.dashboardHeader}>
          <h2 style={styles.dashboardHeaderH2}>Dashboard</h2>
          <div style={styles.date}>{formattedDate}</div>
        </div>
        <div style={styles.cardsScrollContainer}>
          {[1,2,3,4,5,6].map((i) => (
            <div 
              key={i} 
              style={{
                ...styles.card,
                ...(i <= 2 ? styles.cardWide : styles.cardNormal),
                ...styles.skeletonCard
              }}
            >
              <div style={styles.cardContent}>
                <div style={styles.skeletonTitle}></div>
                <div style={styles.cardStats}>
                  <div style={styles.skeletonIcon}></div>
                  <div style={styles.skeletonAmount}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.dashboardHeader}>
        <h2 style={styles.dashboardHeaderH2}>Dashboard</h2>
        <div style={styles.date}>{formattedDate}</div>
      </div>

      <div style={styles.cardsScrollContainer}>
        {cardsData.map((card) => (
          <div
            key={card.id}
            style={{
              ...styles.card,
              ...(card.isWide ? styles.cardWide : styles.cardNormal),
            }}
          >
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <div style={styles.cardStats}>
                <img 
                  src={card.icon} 
                  alt={`${card.title} icon`} 
                  style={styles.cardIcon} 
                />
                <span style={{
                  ...styles.cardAmount,
                  ...(!card.isWide && styles.smallAmount)
                }}>
                  {formatAmount(card.amount, card.formatAsCurrency)}
                </span>
              </div>
            </div>
            {card.hasExpand && (
              <div style={styles.expandIconWrapper}>
                <img 
                  src={expandIcon} 
                  alt="expand" 
                  style={styles.expandIcon}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderDashboard;