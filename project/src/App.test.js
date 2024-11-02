import { render, screen } from '@testing-library/react';
import App from './App';

test('renders customer purchasing dashboard title', () => {
  render(<App />);
  const headerElement = screen.getByText(/Customer Purchasing Dashboard/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders bar chart title', () => {
  render(<App />);
  const barChartTitle = screen.getByText(/Product Sales \(Bar Chart\)/i);
  expect(barChartTitle).toBeInTheDocument();
});

test('renders pie chart title', () => {
  render(<App />);
  const pieChartTitle = screen.getByText(/Product Sales Distribution \(Pie Chart\)/i);
  expect(pieChartTitle).toBeInTheDocument();
});

test('renders start date input', () => {
  render(<App />);
  const startDateInput = screen.getByLabelText(/Start Date/i);
  expect(startDateInput).toBeInTheDocument();
});

test('renders end date input', () => {
  render(<App />);
  const endDateInput = screen.getByLabelText(/End Date/i);
  expect(endDateInput).toBeInTheDocument();
});

test('renders sort order select', () => {
  render(<App />);
  const sortOrderSelect = screen.getByLabelText(/Sort Order/i);
  expect(sortOrderSelect).toBeInTheDocument();
});
