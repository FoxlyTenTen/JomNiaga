import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function DuitNowOverview() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <Image
          source={require('@/assets/images/duitnow.png')} // Replace with your local logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>
          <Text style={{ fontWeight: 'bold' }}>Duit</Text>
          <Text style={{ color: '#f5428d', fontWeight: 'bold' }}>Now</Text>
        </Text>

        {/* Description Box */}
        <View style={styles.card}>
          <Text style={styles.question}>What is DuitNow QR?</Text>
          <Text style={styles.text}>
            DuitNow QR is Malaysia's national QR code standard that allows customers to make
            payments by scanning a single QR.
          </Text>

          <Text style={styles.question}>Why use DuitNow QR for your business?</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• One QR works with all banks & e-wallets</Text>
            <Text style={styles.bullet}>• Easy for customers to use</Text>
            <Text style={styles.bullet}>• Looks more professional and trustworthy</Text>
            <Text style={styles.bullet}>• Helps you track your payments in one place</Text>
          </View>

          <Text style={styles.question}>How to get DuitNow QR</Text>
          <View style={styles.steps}>
            <Text style={styles.step}>1. Register your business with a bank or e-wallet</Text>
            <Text style={styles.step}>2. Apply for DuitNow QR in their mobile app or website</Text>
            <Text style={styles.step}>3. Receive your QR code — print or display it</Text>
            <Text style={styles.step}>4. Start accepting payments right away!</Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('../(tabs)/milestone')}>
          <Text style={styles.buttonText}>Get DuitNow QR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 22,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 30,
    width: '100%',
  },
  question: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 12,
    marginBottom: 6,
    color: '#222',
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  bulletList: {
    marginTop: 4,
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  steps: {
    marginTop: 8,
    paddingLeft: 8,
  },
  step: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#30c2b7',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 28,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
