import React, { useState, useMemo } from 'react';
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

// Helper to generate mock data for the last 30 days
const generateMockData = () => {
  const today = new Date();
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    data.push({
      date: dateStr,
      foods: Math.floor(Math.random() * 800) + 200,
      beverages: Math.floor(Math.random() * 700) + 150,
      desserts: Math.floor(Math.random() * 600) + 100,
    });
  }
  return data;
};

// Helper to get day name from date string (YYYY-MM-DD)
const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { weekday: 'short' });
};

const BarChartStats = () => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const defaultStart = sevenDaysAgo.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(todayStr);
  const [category, setCategory] = useState('all');

  const fullData = useMemo(() => generateMockData(), []);

  const filteredData = useMemo(() => {
    return fullData.filter((item) => item.date >= startDate && item.date <= endDate);
  }, [fullData, startDate, endDate]);

  const sortedData = [...filteredData].sort((a, b) => (a.date > b.date ? 1 : -1));

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

  return (
    <div
      style={{
        width: '98%',              // 80% of view width on PC
        margin: '0 auto',          // center horizontally
        backgroundColor: '#fff',   // white background
        borderRadius: '16px',      // rounded corners
        padding: '24px',           // inner spacing
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', // subtle shadow
        boxSizing: 'border-box',   // include padding in width
      }}
    >
      {/* Header row: title + filters */}
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
          Total Omezet
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

      {/* Bar chart area */}
      <div style={{ width: '100%', height: 400 }}>
        {sortedData.length === 0 ? (
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
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
              <YAxis />
              <Tooltip
                formatter={(value) => `Rp ${value.toLocaleString()}`}
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