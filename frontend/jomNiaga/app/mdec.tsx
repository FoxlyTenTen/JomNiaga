import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function MDECDigitalGrant() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <Image
          source={require('@/assets/images/MDEC.png')} // Replace with your actual logo path
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Info Box */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What is This Grant?</Text>
          <Text style={styles.text}>
            Provides up to RM5000 to help digital solutions such as:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• e-commerce platforms</Text>
            <Text style={styles.bullet}>• POS hardware</Text>
            <Text style={styles.bullet}>• digital marketing</Text>
          </View>

          <Text style={styles.sectionTitle}>Who can apply?</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Malaysian-owned MSMEs</Text>
            <Text style={styles.bullet}>• Registered with SSM</Text>
            <Text style={styles.bullet}>• Business has been operating at least 6 months</Text>
            <Text style={styles.bullet}>• Annual sales below RM5 million</Text>
          </View>

          <Text style={styles.sectionTitle}>What you’ll get:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• 50% matching grant (max RM5000)</Text>
            <Text style={styles.bullet}>• Use it with approved digital partner</Text>
          </View>

          <Text style={styles.sectionTitle}>Application Status</Text>
          <View style={styles.numberedList}>
            <Text style={styles.step}>1. Get a quote from approved vendor</Text>
            <Text style={styles.step}>2. Prepare your documents</Text>
          </View>
        </View>

        {/* Help + CTA */}
        <Text style={styles.helpText}>
          <Text style={styles.link} onPress={() => Linking.openURL('mailto:support@mdec.my')}>Need help?</Text> Contact MDEC grant support
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.buttonText}>Apply Now</Text>
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
    width: 120,
    height: 50,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 16,
    marginBottom: 6,
    color: '#222',
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  bulletList: {
    paddingLeft: 10,
    marginTop: 6,
  },
  bullet: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  numberedList: {
    paddingLeft: 8,
    marginTop: 6,
  },
  step: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  helpText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  link: {
    color: '#30c2b7',
    textDecorationLine: 'underline',
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
