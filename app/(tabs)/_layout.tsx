import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
    const checkUserStatus = async () => {
      const userStatus = await AsyncStorage.getItem('isUser');
      setIsLogin(userStatus === 'true');
    };
    checkUserStatus();
  }, []);

  return (


    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />


      <Tabs.Screen
        name="medalTally"
        options={{
          title: 'Medal Tally',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="overallCharts"
        options={{
          title: 'Overall Charts',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="overAllHeatMap"
        options={{
          title: 'Overall Heat Map',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'flag' : 'flag-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="athletswise"
        options={{
          title: 'Athletes Wise',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="countryWise"
        options={{
          title: 'Country Wise',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'flag' : 'flag-outline'} color={color} />
          ),
        }}
      />
  
    
    </Tabs>
  )
}
