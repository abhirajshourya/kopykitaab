import Book from '@/components/Book';
import { getBorrowedBooks } from '@/controllers/controller';
import { BookModel } from '@/models/Book';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState<{ [key: string]: BookModel }>({});

  const fetchBorrowedBooks = useCallback(() => {
    setLoading(true);
    getBorrowedBooks()
      .then((borrowBooks) => {
        setBooks(borrowBooks!);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBorrowedBooks();
    }, [fetchBorrowedBooks])
  );

  return (
    <ScrollView style={styles.container}>
      {error && <Text>Error: {error}</Text>}
      {books && Object.keys(books).length === 0 && (
        <Text style={styles.noBooks}>No borrowed books!</Text>
      )}

      {books &&
        Object.keys(books).map((bookId) => {
          const book = books[bookId];
          return <Book key={bookId} bookId={bookId} book={book} isReturned={fetchBorrowedBooks} />;
        })}

      {books && Object.keys(books).length !== 0 && (
        <Text style={styles.booksBorrowed}>Books Borrowed: {Object.keys(books).length}/2</Text>
      )}
      {loading && <ActivityIndicator size="small" color="#666" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  noBooks: {
    textAlign: 'center',
    margin: 20,
  },
  booksBorrowed: {
    textAlign: 'center',
    margin: 20,
    fontWeight: '500',
  },
});
