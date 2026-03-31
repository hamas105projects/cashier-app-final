import billIcon from '../assets/images/billDashboard.png';
import walletIcon from '../assets/images/walletDashboard.png';
import listIcon from '../assets/images/listDashboard.png';
import foodIcon from '../assets/images/foodDashboard.png';
import beverageIcon from '../assets/images/beverageDashboard.png';
import dessertIcon from '../assets/images/dessertDashboard.png';
import expandIcon from '../assets/images/expand-arrows.png';

const HeaderDashboard = () => {
  const cardsData = [
    { id: 1, title: 'Total Order', icon: billIcon, amount: 342, isWide: true, hasExpand: false, formatAsCurrency: false },
    { id: 2, title: 'Total Omzet', icon: walletIcon, amount: 124500000, isWide: true, hasExpand: false, formatAsCurrency: true },
    { id: 3, title: 'All Menu Orders', icon: listIcon, amount: 189, isWide: false, hasExpand: false, formatAsCurrency: false },
    { id: 4, title: 'Foods', icon: foodIcon, amount: 98, isWide: false, hasExpand: true, formatAsCurrency: false },
    { id: 5, title: 'Beverages', icon: beverageIcon, amount: 56, isWide: false, hasExpand: true, formatAsCurrency: false },
    { id: 6, title: 'Desserts', icon: dessertIcon, amount: 35, isWide: false, hasExpand: true, formatAsCurrency: false },
  ];

  // Format tanggal dengan hari
  const today = new Date();
  const formattedDate = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatAmount = (amount, isCurrency) => {
    if (isCurrency) return `Rp ${amount.toLocaleString('id-ID')}`;
    return amount.toLocaleString('id-ID');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="date">{formattedDate}</div>
      </div>

      {/* Horizontal scroll container */}
      <div className="cards-scroll-container">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isWide ? 'card-wide' : 'card-normal'} ${
              card.hasExpand ? 'has-expand' : ''
            }`}
          >
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <div className="card-stats">
                <img src={card.icon} alt={`${card.title} icon`} className="card-icon" />
                <span className={`card-amount ${!card.isWide ? 'small-amount' : ''}`}>
                  {formatAmount(card.amount, card.formatAsCurrency)}
                </span>
              </div>
            </div>
            {card.hasExpand && (
              <div className="expand-icon-wrapper">
                <img src={expandIcon} alt="expand" className="expand-icon" />
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 100%;
          padding: 12px 16px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .dashboard-header h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .date {
          font-size: 12px;
          color: #4b5563;
          background: #f3f4f6;
          padding: 4px 12px;
          border-radius: 40px;
          font-weight: 500;
        }

        /* Horizontal scroll container */
        .cards-scroll-container {
          display: flex;
          flex-direction: row;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: thin;
        }

        .cards-scroll-container::-webkit-scrollbar {
          height: 4px;
        }

        .cards-scroll-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .cards-scroll-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        /* Card dasar */
        .card {
          flex-shrink: 0;
          background: white;
          border-radius: 14px;
          padding: 0 10px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
          border: 1px solid #eef2f6;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease;
        }

        /* Lebar card (sudah diperkecil) */
        .card-wide {
          width: 186px;
        }

        .card-normal {
          width: 140px;
        }

        .card-content {
          flex: 1;
          padding: 12px 11px;
        }

        .card-title {
          margin: 0 0 8px 0;
          font-size: 11px;
          font-weight: 600;
          color: #4b5563;
          letter-spacing: 0.2px;
          text-align: left;
        }

        .card-stats {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .card-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .card-amount {
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          line-height: 1.2;
          word-break: break-word;
        }

        /* Ukuran angka lebih kecil untuk All Menu Orders, Foods, Beverages, Desserts */
        .small-amount {
          font-size: 14px;
        }

        .expand-icon-wrapper {
          margin: 0 8px 6px 0;
          text-align: right;
        }

        .expand-icon {
          width: 12px;
          height: 12px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .expand-icon:hover {
          opacity: 1;
        }

        /* Responsif: tetap compact */
        @media (max-width: 640px) {
          .dashboard-container {
            padding: 8px 12px;
          }

          .card-wide {
            width: 150px;
          }

          .card-normal {
            width: 125px;
          }

          .card-title {
            font-size: 10px;
          }

          .card-amount {
            font-size: 14px;
          }

          .small-amount {
            font-size: 12px;
          }

          .card-icon {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderDashboard;