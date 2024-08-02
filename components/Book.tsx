import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { BookModel } from '@/models/Book';
import { Link } from 'expo-router';

interface BookProps {
  bookId: string;
  book: BookModel;
}

const Book = ({ bookId, book }: BookProps) => {
  return (
    <Link
      href={{
        pathname: '/details/[id]',
        params: { id: bookId },
      }}
    >
      <View style={styles.card}>
        <Image
          style={{
            width: 100,
            height: 150,
            flex: 0.3,
            marginRight: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#f0f4f8',
          }}
          source={{ uri: book.photo }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 0.7,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {book.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
            }}
          >
            Author: {book.author}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
            }}
          >
            Year: {book.year}
          </Text>
        </View>
      </View>
    </Link>
  );
};

export default Book;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
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
});
