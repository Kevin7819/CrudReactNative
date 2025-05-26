export const getFirestore = jest.fn();
export const collection = jest.fn();
export const addDoc = jest.fn(() => Promise.resolve({ id: 'mock-id' }));
export const getDocs = jest.fn(() => Promise.resolve({ 
  docs: [], 
  forEach: jest.fn() 
}));
export const deleteDoc = jest.fn(() => Promise.resolve());
export const doc = jest.fn();