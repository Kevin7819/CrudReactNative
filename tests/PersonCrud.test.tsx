//UI testing for the PersonCrud component using React Native Testing Library.
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

import React from 'react';
import { Alert } from 'react-native';
import { PersonCrud } from '../app/components/PersonCrud'; // the component we want to test is imported.
import type { Person } from '../hooks/usePersonCrud'; // Type Person to create test data.

describe('PersonCrud Component', () => {
  const mockOnSave = jest.fn(); // simulates the function  that saves a person.
  const mockOnEdit = jest.fn(); // simulates the function that edits a person.
  const mockOnDelete = jest.fn(); // simulates the function that deletes a person.
  const mockSetName = jest.fn(); // simulates the function that sets the name of a person.
  const mockSetLastname = jest.fn(); // simulates the function that sets the last name of a person.

  const sampleList: Person[] = [
    { id: '1', name: 'Juan', lastname: 'Pérez' },
    { id: '2', name: 'Ana', lastname: 'García' }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el formulario y la lista de personas correctamente', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <PersonCrud
        list={sampleList}
        name=""
        lastname=""
        editing={false}
        setName={mockSetName}
        setLastname={mockSetLastname}
        onSave={mockOnSave}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(getByPlaceholderText('Nombre')).toBeTruthy(); // verifies that the name input exists
    expect(getByPlaceholderText('Apellido')).toBeTruthy(); // verifies that the lastame input exists
    expect(getByText('Crear')).toBeTruthy();
    expect(getByText('Juan Pérez')).toBeTruthy(); // verifies that the two sampleList persons are shown
    expect(getByText('Ana García')).toBeTruthy();
    expect(queryByText('Actualizar')).toBeNull();
  });

  it('al cambiar texto en inputs invoca setName y setLastname', async () => {
    const { getByPlaceholderText } = render(
      <PersonCrud
        list={[]}
        name=""
        lastname=""
        editing={false}
        setName={mockSetName}
        setLastname={mockSetLastname}
        onSave={mockOnSave}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

   // simulation of typing “Pedro” in the input Name
    fireEvent.changeText(getByPlaceholderText('Nombre'), 'Pedro');
    expect(mockSetName).toHaveBeenCalledWith('Pedro');

 // simulation of typing Lopez in the input lastname
    fireEvent.changeText(getByPlaceholderText('Apellido'), 'López');
    expect(mockSetLastname).toHaveBeenCalledWith('López');
  });

  it('cuando editing = true, el botón debe mostrar “Actualizar”', async () => {
    const { getByText } = render(
      <PersonCrud
        list={[]}
        name="Ana"
        lastname="García"
        editing={true}
        setName={mockSetName}
        setLastname={mockSetLastname}
        onSave={mockOnSave}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(getByText('Actualizar')).toBeTruthy();
  });

  it('al presionar “Crear” o “Actualizar” llama a onSave', async () => {
    const { getByText } = render(
      <PersonCrud
        list={[]}
        name="Pedro"
        lastname="López"
        editing={false}
        setName={mockSetName}
        setLastname={mockSetLastname}
        onSave={mockOnSave}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    await act(async () => {
      fireEvent.press(getByText('Crear')); // simulation of the “Create” button press event
    });
    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it('al presionar el ícono de editar (✏️), llama a onEdit con la persona correcta', async () => {
    const { getAllByText } = render(
      <PersonCrud
        list={sampleList}
        name=""
        lastname=""
        editing={false}
        setName={mockSetName}
        setLastname={mockSetLastname}
        onSave={mockOnSave}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = getAllByText('✏️');
    expect(editButtons.length).toBe(sampleList.length);

    await act(async () => {
      fireEvent.press(editButtons[0]);
    });
    expect(mockOnEdit).toHaveBeenCalledWith(sampleList[0]);
  });

  it('al confirmar eliminación, llama a onDelete con el id correcto', async () => {
     // Alert.alert and force you to press “Yes” on confirmation
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation((_, __, buttons) => {
      if (Array.isArray(buttons)) {
         // Only if the button array (confirmation) is displayed, press “Yes” (index 1).
        const yesButton = (buttons as any[])[1];
        yesButton.onPress?.();
      }
      
    });

    const { getAllByText } = render(
      <PersonCrud
        list={sampleList}
        name=""
        lastname=""
        editing={false}
        setName={mockSetName}
        setLastname={mockSetLastname}
        onSave={mockOnSave}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = getAllByText('🗑️');
    await act(async () => {
      fireEvent.press(deleteButtons[1]);
    });

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith('2');
    });

    alertSpy.mockRestore();
  });
});
