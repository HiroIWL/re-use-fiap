import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: '#fff',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarItemStyle: {
          flex: 1,
          width: 30
        },
        tabBarStyle: {
          borderColor: 'transparent',
          backgroundColor: '#561065',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: Platform.OS === 'android' ? 10 : 0,
          paddingTop: Platform.OS === 'android' ? 10 : 0,
        },
        tabBarActiveTintColor: 'white',
        tabBarLabel: ({ focused, children }) => {
          return (
            <Text style={{
              color: 'white',
              fontSize: 12,
              fontFamily: 'SpaceMono',
              textAlign: 'center',
              borderBottomColor: focused ? 'white' : 'transparent',
              borderBottomWidth: focused ? 1 : 0,
            }}>{children}</Text>
          );
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: 'Meus Likes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="trocas"
        options={{
          title: 'Trocas',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cube.box.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
