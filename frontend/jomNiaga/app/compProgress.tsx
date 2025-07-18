import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function MilestonePage() {
  const router = useRouter();

  const handleStartNow = () => {
    router.replace('/(tabs)'); // Replace with your actual home or dashboard route
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Milestone</Text>

      <View style={styles.celebration}>
        <Text style={styles.emoji}>🎉</Text>
        <Image source={require('@/assets/images/check.png')} style={styles.checkIcon} />
        <Text style={styles.emoji}>🎉</Text>
      </View>

      <Text style={styles.completedText}>You’ve Completed{'\n'}Register with SSM !</Text>

      <Text style={styles.subText}>
        Wait for the approval from SSM{'\n'}and you can start open business account!!
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={handleStartNow}>
        <Text style={styles.startButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#30c2b7',
    marginBottom: 30,
  },
  celebration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 70,
    marginHorizontal: 10,
  },
  checkIcon: {
    width: 60,
    height: 60,
  },
  completedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#30c2b7',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
