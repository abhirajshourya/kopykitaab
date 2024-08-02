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
  getDoc,
  setDoc,
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

// Get Book by ID
export const getBookById = async (id: string) => {
  const booksCollection = collection(db, 'books');
  const bookDoc = doc(booksCollection, id);
  try {
    const docSnap = await getDoc(bookDoc);
    return docSnap;
  } catch (e) {
    console.error('Error getting document: ', e);
  }
};

// Add new borrowed book
export const borrowBook = async (id: string) => {
  const borrowedBooksCollection = collection(db, 'borrowedBooks');

  //check if borrowed books is less than 2
  const borrowedBooks = await getBorrowedBooks();
  if (Object.keys(borrowedBooks!).length >= 2) {
    throw new Error(
      'You can only borrow 2 books at a time. Please return a book to borrow another.'
    );
  }

  const bookDoc = doc(borrowedBooksCollection, id);
  try {
    await setDoc(bookDoc, { borrowed: true });
  } catch (e) {
    console.error('Error borrowing book: ', e);
  }
};

// Return borrowed book
export const returnBook = async (id: string) => {
  const borrowedBooksCollection = collection(db, 'borrowedBooks');
  const bookDoc = doc(borrowedBooksCollection, id);
  try {
    await deleteDoc(bookDoc);
  } catch (e) {
    console.error('Error returning book: ', e);
  }
};

// Get all borrowed books
export const getBorrowedBooks = async () => {
  const borrowedBooksCollection = collection(db, 'borrowedBooks');
  try {
    const querySnapshot = await getDocs(borrowedBooksCollection);
    // extract the book IDs
    const bookIds = querySnapshot.docs.map((doc) => doc.id);
    let books = {};
    // get book details for each book ID
    for (const bookId of bookIds) {
      const book = await getBookById(bookId);
      books = {
        ...books,
        [bookId]: book?.data(),
      };
    }
    return books;
  } catch (e) {
    console.error('Error getting documents: ', e);
  }
};

// isBookBorrowed
export const isBookBorrowed = async (id: string) => {
  const borrowedBooksCollection = collection(db, 'borrowedBooks');
  const bookDoc = doc(borrowedBooksCollection, id);
  try {
    const docSnap = await getDoc(bookDoc);
    return docSnap.exists();
  } catch (e) {
    console.error('Error getting document: ', e);
  }
};
