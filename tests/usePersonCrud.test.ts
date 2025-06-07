/**
 * tests/usePersonCrud.test.ts
 *
 * unit tests for the hook usePersonCrud.
 */


import { act, renderHook, waitFor } from '@testing-library/react-native';
import * as svc from '../app/services/firebase';
import { Person, usePersonCrud } from '../hooks/usePersonCrud';

// We mock Firebase functions not to call the real Firestore

jest.mock('../app/services/firebase', () => ({
  getPersons: jest.fn(),
  createPerson: jest.fn(),
  updatePerson: jest.fn(),
  deletePerson: jest.fn(),
}));

describe('usePersonCrud hook', () => {
  // Example list to be returned by getPersons
  const sampleList: Person[] = [
    { id: '1', name: 'Juan', lastname: 'Pérez' },
    { id: '2', name: 'Ana', lastname: 'García' }
  ];

  beforeEach(() => {
    // Each time getPersons is invoked, we return sampleList
    (svc.getPersons as jest.Mock).mockResolvedValue(sampleList);
    jest.clearAllMocks();
  });

  it('debe cargar la lista inicial al montar', async () => {
    const { result } = renderHook(() => usePersonCrud());

    // We wait until “result.current.list” contains sampleList
    await waitFor(() => {
      expect(result.current.list).toEqual(sampleList);
    });

    // We verify that getPersons has been called at least once.
    expect(svc.getPersons).toHaveBeenCalledTimes(1);
  });

  it('onSave() en modo creación llama a createPerson y recarga la lista', async () => {
    const { result } = renderHook(() => usePersonCrud());

    // is expected to load the initial list
    await waitFor(() => {
      expect(result.current.list).toEqual(sampleList);
    });

// simulation that the user types “Pedro” / “Lopez”.
    act(() => {
      result.current.setName('Pedro');
      result.current.setLastname('López');
    });

     // createPerson to solve successfully
    (svc.createPerson as jest.Mock).mockResolvedValue({ id: '3' });

    // Call onSave (creation)
    await act(async () => {
      await result.current.onSave();
    });

    // We verify that createPerson has been called with the correct payload.
    expect(svc.createPerson).toHaveBeenCalledWith({ name: 'Pedro', lastname: 'López' });

   // Now getPersons should have been called a second time to reload
    expect(svc.getPersons).toHaveBeenCalledTimes(2);

    // And that the name/lastName fields will be cleared
    expect(result.current.name).toBe('');
    expect(result.current.lastname).toBe('');
  });

  it('onSave() en modo edición llama a updatePerson y resetea editingId', async () => {
    const { result } = renderHook(() => usePersonCrud());

     // We wait for initial list to load
    await waitFor(() => {
      expect(result.current.list).toEqual(sampleList);
    });

   
    act(() => {
      result.current.onEdit({ id: '2', name: 'Ana', lastname: 'García' });
    });

    // We verify that name and lastname are assigned
    expect(result.current.name).toBe('Ana');
    expect(result.current.lastname).toBe('García');
    expect(result.current.editing).toBe(true);

    // We change the name to “Ana María”.
    act(() => {
      result.current.setName('Ana María');
    });

    // Mock de updatePerson
    (svc.updatePerson as jest.Mock).mockResolvedValue(undefined);

    await act(async () => {
      await result.current.onSave();
    });

    // You must have called updatePerson with id and updated information.
    expect(svc.updatePerson).toHaveBeenCalledWith('2', {
      name: 'Ana María',
      lastname: 'García'
    });

    
    expect(result.current.editing).toBe(false);

    // Clean fields
    expect(result.current.name).toBe('');
    expect(result.current.lastname).toBe('');

    // getPersons must have been called again to reload the list
    expect(svc.getPersons).toHaveBeenCalledTimes(2);
  });

  it('onDelete() llama a deletePerson y recarga la lista', async () => {
    const { result } = renderHook(() => usePersonCrud());

    // We are waiting for the initial list
    await waitFor(() => {
      expect(result.current.list).toEqual(sampleList);
    });

    // Mock of deletePerson
    (svc.deletePerson as jest.Mock).mockResolvedValue(undefined);

    //  Call to onDelete
    await act(async () => {
      await result.current.onDelete('1');
    });

     // You must have called deletePerson with id '1'.
    expect(svc.deletePerson).toHaveBeenCalledWith('1');

    // getPersons to reload the list (second call)
    expect(svc.getPersons).toHaveBeenCalledTimes(2);
  });
});
