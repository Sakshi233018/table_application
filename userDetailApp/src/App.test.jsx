import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userData from './user_data.json';

// Wrap the tests in a describe block
describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders the table and title', () => {
    expect(screen.getByRole('heading', { name: /subscriptions/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('renders correct number of rows based on user data', () => {
    const rows = screen.getAllByRole('row'); // includes header row
    // +1 for the header row
    expect(rows.length).toBe(userData.subscriptions.length + 1);
  });

  test('applies correct classes for status values', () => {
    userData.subscriptions.forEach(({ status }) => {
      const statusCells = screen.getAllByText(new RegExp(`^${status}$`, 'i'));
      expect(statusCells.length).toBeGreaterThan(0);

      const statusCell = statusCells[0];
      expect(statusCell).toBeInTheDocument();

      const parentDiv = statusCell.closest('.cell-bg');
      expect(parentDiv).toBeTruthy();

      if (status === 'ACTIVE') {
        expect(parentDiv.classList.contains('status-active')).toBe(true);
      } else if (status === 'SUSPENDED') {
        expect(parentDiv.classList.contains('status-suspended')).toBe(true);
      } else {
        expect(parentDiv.classList.contains('status-other')).toBe(true);
      }
    });
  });

  test('renders correct sync icon and class for each sync value', () => {
    userData.subscriptions.forEach(({ sync }) => {
      const syncCells = screen.getAllByText(new RegExp(`^${sync}$`, 'i'));
      expect(syncCells.length).toBeGreaterThan(0);

      const syncCell = syncCells[0];
      expect(syncCell).toBeInTheDocument();

      const parentDiv = syncCell.closest('.cell-bg');
      expect(parentDiv).toBeTruthy();

      if (sync === 'IN_SYNC') {
        expect(parentDiv.classList.contains('sync-success')).toBe(true);
      } else if (sync.startsWith('NOT_FOUND')) {
        expect(parentDiv.classList.contains('sync-other')).toBe(true);
      } else {
        expect(parentDiv.classList.contains('sync-warning')).toBe(true);
      }
    });
  });
});
