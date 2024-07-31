import { BookModel } from '@/models/Book';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCNqypaKEZPWnJdFx3cQFXdeUMFqGchkDU',
  authDomain: 'info6132-d6021.firebaseapp.com',
  projectId: 'info6132-d6021',
  storageBucket: 'info6132-d6021.appspot.com',
  messagingSenderId: '514232397334',
  appId: '1:514232397334:web:ee736fa9bb61fce2df0f37',
};

const firebaseApp = initializeApp(firebaseConfig);

// Get the Firestore instance
const db = getFirestore(firebaseApp);

// Upload data to Firestore
export const uploadData = async (data: BookModel[]) => {
  try {
    const booksCollection = collection(db, 'books');
    data.forEach(async (book) => {
      await addDoc(booksCollection, book);
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Get all data from Firestore
export const getAllData = async () => {
  const booksCollection = collection(db, 'books');
  try {
    const querySnapshot = await getDocs(booksCollection);
    return querySnapshot;
  } catch (e) {
    console.error('Error getting documents: ', e);
  }
};
