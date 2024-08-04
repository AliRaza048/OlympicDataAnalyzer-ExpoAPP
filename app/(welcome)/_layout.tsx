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
    
      </Tabs>);
}
