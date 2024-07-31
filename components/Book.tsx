import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { BookModel } from '@/models/Book';

interface BookProps {
  bookId: string;
  book: BookModel;
}

const Book = ({ bookId, book }: BookProps) => {
  return (
    <View style={styles.card}>
      <Image style={{ width: 100, height: 150 }} source={{ uri: book.photo }} />
      <View>
        <Text>{book.title}</Text>
        <Text>{book.author}</Text>
      </View>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
