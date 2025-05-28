import firestore from '@react-native-firebase/firestore';

const COLLECTION_NAME = 'items';

export const getItems = () => {
  return firestore().collection(COLLECTION_NAME).get();
};

export const addItem = (item) => {
  return firestore().collection(COLLECTION_NAME).add(item);
};