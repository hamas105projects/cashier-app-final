import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getDailyReport } from '../../services/api';

const BarChartStats = () => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const defaultStart = thirtyDaysAgo.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(todayStr);
  const [category, setCategory] = useState('all');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API daily report
  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        // Panggil API daily report
        const response = await getDailyReport(startDate, endDate);
        console.log('📊 Daily Report Response:', response);
        
        // Ambil data dari response
        const dailyData = response?.data?.data || response?.data || response;
        
        // Pastikan dailyData adalah array
        let dataArray = Array.isArray(dailyData) ? dailyData : [];
        
        // Generate semua tanggal dalam range
        const rangeStart = new Date(startDate);
        const rangeEnd = new Date(endDate);
        const allDates = [];
        
        for (let d = new Date(rangeStart); d <= rangeEnd; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().slice(0, 10);
          allDates.push(dateStr);
        }
        
        // Isi tanggal yang kosong (jika tidak ada data)
        const completeData = allDates.map(date => {
          const existing = dataArray.find(item => item.date === date);
          if (existing) return existing;
          return {
            date: date,
            foods: 0,
            beverages: 0,
            desserts: 0,
            total: 0
          };
        });
        
        setChartData(completeData);
      } catch (error) {
        console.error('Error fetching daily report:', error);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChartData();
  }, [startDate, endDate]);

  // Helper to get day name from date string (YYYY-MM-DD)
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { weekday: 'short' });
  };

  const colors = {
    foods: '#0E43AF',
    beverages: '#3572EF',
    desserts: '#C2D4FA',
  };

  const renderBars = () => {
    switch (category) {
      case 'foods':
        return <Bar dataKey="foods" fill={colors.foods} name="Foods" />;
      case 'beverages':
        return <Bar dataKey="beverages" fill={colors.beverages} name="Beverages" />;
      case 'desserts':
        return <Bar dataKey="desserts" fill={colors.desserts} name="Desserts" />;
      default:
        return (
          <>
            <Bar dataKey="foods" fill={colors.foods} name="Foods" />
            <Bar dataKey="beverages" fill={colors.beverages} name="Beverages" />
            <Bar dataKey="desserts" fill={colors.desserts} name="Desserts" />
          </>
        );
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: '98%',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '24px',
            gap: '12px',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
            Total Omzet
          </h2>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <label style={{ marginRight: '8px', fontWeight: '500' }}>Start:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ marginRight: '8px', fontWeight: '500' }}>Finish:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="all">All</option>
                <option value="foods">Foods</option>
                <option value="beverages">Beverages</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '98%',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '24px',
          gap: '12px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
          Total Omzet
        </h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ marginRight: '8px', fontWeight: '500' }}>Start:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ marginRight: '8px', fontWeight: '500' }}>Finish:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              <option value="all">All</option>
              <option value="foods">Foods</option>
              <option value="beverages">Beverages</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: 400, minHeight: 300, minWidth: 0 }}>
        {chartData.length === 0 ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f9f9f9',
              borderRadius: '12px',
            }}
          >
            <p>No data available for the selected date range.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="20%"
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) => getDayName(dateStr)}
                tick={{ fontSize: 12 }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickFormatter={(value) => `Rp ${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value) => `Rp ${value?.toLocaleString() || 0}`}
                labelFormatter={(label) => `Tanggal: ${label} (${getDayName(label)})`}
              />
              <Legend verticalAlign="bottom" height={36} />
              {renderBars()}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BarChartStats;