import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import * as firestore from '../services/firebase';

jest.mock('../services/firebase');

describe('HomeScreen', () => {
  const mockNavigation = { navigate: jest.fn() };

  const mockData = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
    { id: '2', name: 'Ana Ruiz', email: 'ana@example.com' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    firestore.getPersons.mockResolvedValue(mockData);
  });

  it('renders the list of persons and allows deletion', async () => {
    const { getByText, getByTestId, queryByText, queryByTestId } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    }, { timeout: 6000 });

    expect(getByText('Juan Pérez')).toBeTruthy();
    expect(getByText('Ana Ruiz')).toBeTruthy();

    firestore.deletePerson.mockResolvedValue();
    firestore.getPersons.mockResolvedValue([
      { id: '2', name: 'Ana Ruiz', email: 'ana@example.com' }
    ]);

    fireEvent.press(getByTestId('delete-button-1'));

    await waitFor(() => {
      expect(queryByText('Juan Pérez')).toBeNull();
    }, { timeout: 6000 });
  });

  it('navigates to Create screen', async () => {
    const { getByTestId, queryByTestId } = render(<HomeScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    }, { timeout: 6000 });

    fireEvent.press(getByTestId('add-button'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Create');
  });

  it('navigates to Edit screen with correct person data', async () => {
    const { getByTestId, queryByTestId } = render(<HomeScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    }, { timeout: 6000 });

    fireEvent.press(getByTestId('edit-button-1'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Edit", {
      person: { id: '1', name: 'Juan Pérez', email: 'juan@example.com' }
    });
  });
});