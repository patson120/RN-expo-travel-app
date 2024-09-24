import { Tabs } from 'expo-router'
import React from 'react'

import { COLORS, icons } from '@/constants'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Image, View } from 'react-native'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.black,
          borderTopColor: "transparent",
          height: 60
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <View className='justify-center items-center'>
              <Image
                source={icons.maps}
                resizeMode="contain"
                className='w-6 h-6'
                style={{
                  tintColor: focused ? COLORS.blue : COLORS.gray
                }}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="Bookmark"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className='justify-center items-center'>
              <Image
                source={icons.bookmark}
                resizeMode="contain"
                className='w-6 h-6'
                style={{
                  tintColor: focused ? COLORS.blue : COLORS.gray
                }}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className='justify-center items-center'>
              <Image
                source={icons.calendar}
                resizeMode="contain"
                className='w-6 h-6'
                style={{
                  tintColor: focused ? COLORS.blue : COLORS.gray
                }}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="Plane"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className='justify-center items-center'>
              <Image
                source={icons.plane}
                resizeMode="contain"
                className='w-6 h-6'
                style={{
                  tintColor: focused ? COLORS.blue : COLORS.gray
                }}
              />
            </View>
          )
        }}
      />
    </Tabs>
  )
}
