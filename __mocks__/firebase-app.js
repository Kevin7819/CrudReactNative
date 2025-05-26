export const getPersons = jest.fn(() => Promise.resolve([]));
export const deletePerson = jest.fn(() => Promise.resolve());
export const initializeApp = jest.fn();
export const getApp = jest.fn();
export const getApps = jest.fn(() => []);
export const registerVersion = jest.fn();