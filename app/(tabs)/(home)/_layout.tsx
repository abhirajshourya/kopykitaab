import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Books',
        }}
      />
      {/* <Stack.Screen
        name="details/[id]"
        options={{
          title: 'Book Details',
          headerBackTitleVisible: false,
        }}
      /> */}
    </Stack>
  );
}
