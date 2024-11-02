import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';
import { fetchPurchases } from './api';
import useDebounce from './useDebounce';

const App = () => {
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortOrder, setSortOrder] = useState('asc');
  const debouncedDateRange = useDebounce(dateRange, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPurchases();
        setProductData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [debouncedDateRange, sortOrder, productData]);

  const filterAndSortData = () => {
    let filtered = productData;

    if (debouncedDateRange.start && debouncedDateRange.end) {
      filtered = filtered.filter(item => {
        const date = new Date(item.date);
        return date >= new Date(debouncedDateRange.start) && date <= new Date(debouncedDateRange.end);
      });
    }

    filtered.sort((a, b) => {
      return sortOrder === 'asc' ? a.purchases - b.purchases : b.purchases - a.purchases;
    });

    setFilteredData(filtered);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const productNames = filteredData.map(item => item.product);
  const productPurchases = filteredData.map(item => item.purchases);

  const barChartData = {
    labels: productNames,
    datasets: [
      {
        label: 'Purchases',
        data: productPurchases,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieChartData = {
    labels: productNames,
    datasets: [
      {
        data: productPurchases,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Purchasing Dashboard</h1>
      </header>

      <div className="controls">
        <div className="date-range">
          <label>
            Start Date:
            <input type="date" name="start" value={dateRange.start} onChange={handleDateChange} />
          </label>
          <label>
            End Date:
            <input type="date" name="end" value={dateRange.end} onChange={handleDateChange} />
          </label>
        </div>

        <div className="sort-order">
          <label>
            Sort Order:
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </div>

      <div className="chart-container">
        <div className="bar-chart">
          <h2>Product Sales (Bar Chart)</h2>
          <Bar data={barChartData} />
        </div>

        <div className="pie-chart">
          <h2>Product Sales Distribution (Pie Chart)</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default App;
