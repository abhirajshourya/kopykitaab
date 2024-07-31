import { ScrollView, StyleSheet, Text } from 'react-native';
import Book from '@/components/Book';
import { useEffect, useState } from 'react';
import { getAllData } from '@/controllers/controller';
import { BookModel } from '@/models/Book';

export default function Tab() {
  const [books, setBooks] = useState<any>({});
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllData().then((dataSnapshot) => {
      dataSnapshot?.forEach((doc) => {
        const bookId = doc.id;
        const bookData = doc.data();

        setBooks((prevBooks: any) => {
          return {
            ...prevBooks,
            [bookId]: bookData,
          };
        });
      });
    });
  });
  return (
    <ScrollView style={styles.container}>
      {error && <Text>Error loading data</Text>}
      {Object.keys(books).map((bookId) => {
        return <Book key={bookId} bookId={bookId} book={books[bookId] as BookModel} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#f0f4f8',
    padding: 10,
  },
});
