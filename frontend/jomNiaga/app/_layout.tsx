import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="calendar" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="type" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="industry" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="location" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="ssm" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="signature" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="completed" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="compProgress" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="maybanksme" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="profile" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="submittedSme" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
