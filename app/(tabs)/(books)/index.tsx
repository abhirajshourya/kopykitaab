import { getAllData, uploadData } from '@/controllers/controller';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text } from 'react-native';
import Book from '@/components/Book';
import { BookModel } from '@/models/Book';
import mockdata from '@/assets/mockdata.json';

export default function Tab() {
  const [books, setBooks] = useState<{ [key: string]: BookModel }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAllData()
      .then((dataSnapshot) => {
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
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* --------Button to upload generated mockdata to firestore--------- */}
      {/* <Button
        onPress={() => {
          uploadData(mockdata);
        }}
        title="Upload Data"
      /> */}

      {/* Main Logic */}
      {loading && <ActivityIndicator size="large" color="#666" />}
      {error && <Text>Error: {error}</Text>}
      {books &&
        Object.keys(books).map((bookId) => {
          const book = books[bookId];
          return (
            <Book key={bookId} bookId={bookId} book={book} to="/(tabs)/(books)/details/[id]" />
          );
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
