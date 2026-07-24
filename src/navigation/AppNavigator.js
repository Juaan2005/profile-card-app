import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../constants/colors';

import HomeScreen from '../screens/HomeScreen';
import ProfileCardScreen from '../screens/ProfileCardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileCard"
        component={ProfileCardScreen}
        options={{ title: 'Profil Saya' }}
      />
    </Stack.Navigator>
  );
}
