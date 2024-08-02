import { useLocalSearchParams } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borrowBook, getBookById } from '@/controllers/controller';
import { BookModel } from '@/models/Book';
import { Feather } from '@expo/vector-icons';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const [book, setBook] = useState<BookModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    setLoading(true);
    getBookById(id as string)
      .then((bookData) => {
        setBook(bookData?.data() as BookModel);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
        {book && (
          <View style={styles.detailsView}>
            <Text style={styles.title}>{book.title}</Text>
            <Image source={{ uri: book.photo }} style={styles.image} />
            <DetailItem title="Author" content={book.author} />
            <DetailItem title="Year" content={book.year.toString()} />
            {book.summary !== 'N/A' && (
              <DetailItem
                title="Rating"
                content={typeof book.rating === 'number' ? book.rating.toFixed(2).toString() : ''}
              />
            )}
            {book.summary !== 'N/A' && (
              <DetailItem
                title="Summary"
                content={Array.isArray(book.summary) ? book.summary.join('\n') : book.summary}
              />
            )}
            {book.language !== 'N/A' && <DetailItem title="Language" content={book.language} />}
            {book.format !== 'N/A' && <DetailItem title="Format" content={book.format} />}
            {book.genres !== 'N/A' && <DetailItem title="Genres" content={book.genres} />}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          borrowBook(id as string);
        }}
      >
        <Feather name="bookmark" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const DetailItem = ({ title, content }: { title: string; content: string }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  detailsView: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 500,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    fontSize: 18,
    color: '#4f4f4f',
    fontWeight: '500',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});
