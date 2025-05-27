// __tests__/HomeScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import * as firestore from '../services/firestore';

// Mock de Firebase
jest.mock('../services/firestore');

describe('HomeScreen', () => {
  const mockNavigation = { navigate: jest.fn() };

  const mockData = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
    { id: '2', name: 'Ana Ruiz', email: 'ana@example.com' }
  ];

  beforeEach(() => {
    firestore.getPersons.mockResolvedValue(mockData);
  });

  it('renders the list of persons and allows deletion', async () => {
    const { getByText, getByTestId, queryByText } = render(<HomeScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('Juan Pérez')).toBeTruthy();
      expect(getByText('Ana Ruiz')).toBeTruthy();
    });

    const deleteButton = getByTestId('delete-button-1');
    firestore.deletePerson.mockResolvedValue();
    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(queryByText('Juan Pérez')).toBeNull();
    });
  });

  it('navigates to Create screen', () => {
    const { getByTestId } = render(<HomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByTestId('add-button'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Create');
  });
});
