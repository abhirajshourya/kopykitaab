import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useCallback, useState } from 'react';
import { BookModel } from '@/models/Book';
import { Link, useFocusEffect } from 'expo-router';
import { borrowBook, isBookBorrowed, returnBook } from '@/controllers/controller';
import { TabBarIcon } from './navigation/TabBarIcon';

interface BookProps {
  bookId: string;
  book: BookModel;
}

const Book = ({ bookId, book }: BookProps) => {
  const [isBorrowed, setIsBorrowed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      isBookBorrowed(bookId).then((borrowed) => {
        setIsBorrowed(borrowed!);
      });
    }, [])
  );

  function borrowHandler() {
    if (isBorrowed) {
      returnBook(bookId).then(() => {
        setIsBorrowed(false);
      });
    } else {
      borrowBook(bookId)
        .then(() => {
          setIsBorrowed(true);
        })
        .catch((err) => {
          Alert.alert('Oops!', err.message);
        });
    }
  }

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
            justifyContent: 'space-between',
          }}
        >
          <View>
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity onPress={borrowHandler}>
              <TabBarIcon name={isBorrowed ? 'bookmark' : 'bookmark-outline'} color="#007bff" />
            </TouchableOpacity>
          </View>
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
