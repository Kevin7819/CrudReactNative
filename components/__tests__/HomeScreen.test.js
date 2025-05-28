import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import * as firestore from '../services/firebase';

// Mock the Firebase service so we don't make real calls
jest.mock('../services/firebase');

describe('HomeScreen', () => {
  // Mock navigation object to test navigation behavior
  const mockNavigation = { navigate: jest.fn() };

  // Mock data representing persons retrieved from Firebase
  const mockData = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
    { id: '2', name: 'Ana Ruiz', email: 'ana@example.com' }
  ];

  beforeEach(() => {
    // Reset all mocks before each test to avoid side effects
    jest.clearAllMocks();
    // Set up the mock to resolve with our mock data
    firestore.getPersons.mockResolvedValue(mockData);
  });

  it('renders the list of persons and allows deletion', async () => {
    // Render the component with mocked navigation
    const { getByText, getByTestId, queryByText, queryByTestId } = render(<HomeScreen navigation={mockNavigation} />);

    // Wait for the loading indicator to disappear (simulate data fetch)
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    }, { timeout: 3000 }); // Increase timeout to avoid test failures in CI

    // Ensure both persons are rendered
    expect(getByText('Juan Pérez')).toBeTruthy();
    expect(getByText('Ana Ruiz')).toBeTruthy();

    // Mock deletion response
    firestore.deletePerson.mockResolvedValue();

    // Simulate getPersons being called again after deletion,
    // now returning only Ana to simulate Juan was removed
    firestore.getPersons.mockResolvedValue([
      { id: '2', name: 'Ana Ruiz', email: 'ana@example.com' }
    ]);

    // Simulate pressing the delete button for Juan
    fireEvent.press(getByTestId('delete-button-1'));

    // Wait for Juan to be removed from the screen
    await waitFor(() => {
      expect(queryByText('Juan Pérez')).toBeNull();
    }, { timeout: 3000 });
  });

  it('navigates to Create screen', async () => {
    // Render the screen
    const { getByTestId, queryByTestId } = render(<HomeScreen navigation={mockNavigation} />);

    // Wait for the loader to disappear before interacting
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    }, { timeout: 3000 });

    // Simulate pressing the add button
    fireEvent.press(getByTestId('add-button'));

    // Expect the navigation function to have been called with 'create'
    expect(mockNavigation.navigate).toHaveBeenCalledWith('create');
  });
});
