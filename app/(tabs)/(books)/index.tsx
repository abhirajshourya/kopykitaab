import { getAllData } from '@/controllers/controller';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Book from '@/components/Book';
import { BookModel } from '@/models/Book';

export default function Tab() {
  const [books, setBooks] = useState<{ [key: string]: BookModel }>({});

  useEffect(() => {
    getAllData().then((dataSnapshot) => {
      dataSnapshot?.forEach((doc: { id: any; data: () => any }) => {
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
  }, []);

  return (
    <ScrollView style={styles.container}>
      {Object.keys(books).map((bookId) => {
        const book = books[bookId];
        return <Book key={bookId} bookId={bookId} book={book} />;
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
