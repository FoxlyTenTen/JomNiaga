import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',  // Pure white background
          borderTopWidth: 0,         // No border
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused }) => {
          const iconSize = 24;
          let IconComponent;
          let iconName;
          let label;

          switch (route.name) {
            case 'index':
              IconComponent = MaterialIcons;
              iconName = 'home-filled';
              label = 'Home';
              break;
            case 'msme':
              IconComponent = Fontisto;
              iconName = 'bell-alt';
              label = 'MSME';
              break;
            case 'milestone':
              IconComponent = MaterialIcons;
              iconName = 'flag';
              label = 'Milestone';
              break;
            case 'business':
              IconComponent = MaterialIcons;
              iconName = 'business-center';
              label = 'Business';
              break;
          }

          return (
            <View style={styles.tabItem}>
              {focused ? (
                <LinearGradient
                  colors={['#30c2b7', '#26a69a']}
                  style={styles.activeBubble}
                >
                  <IconComponent name={iconName} size={iconSize} color="#fff" />
                </LinearGradient>
              ) : (
                <View style={styles.inactiveBubble}>
                  <IconComponent name={iconName} size={iconSize} color="#30c2b7" />
                </View>
              )}
              <Text
                style={[styles.label, { color: focused ? '#30c2b7' : '#888' }]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="msme" />
      <Tabs.Screen name="milestone" />
      <Tabs.Screen name="business" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 200
  },
  activeBubble: {
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveBubble: {
    backgroundColor: '#f0fdfa',
    borderRadius: 50,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,

    fontWeight: '500',
    textAlign: 'center',
  },
});
