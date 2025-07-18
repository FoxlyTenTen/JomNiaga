import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';

export default function JomNiagaOnboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Fullscreen Background */}
      <ImageBackground
        source={require('../../assets/images/onboarding.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Language Picker */}
        <View style={styles.languagePicker}>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
              { label: 'Malaysia', value: 'malaysia' },
              { label: 'Indonesia', value: 'indonesia' },
              { label: 'Thailand', value: 'thailand' },
            ]}
            placeholder={{ label: 'Malaysia', value: 'malaysia' }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Text style={{ marginLeft: 5, color: '#fff' }}>▼</Text>}
          />
        </View>

        {/* Transparent Gradient Bottom */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.bottomGradient}
        >
          <View style={styles.logoRow}>
            <Image
              source={require('../../assets/images/jomLogo.jpg')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            Simplify Your Onboarding{"\n"}As New Entrepreneurs
          </Text>

          <Text style={styles.subtitle}>
            Launch Your Business, No Stress — JomNiaga Simplifies It All
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push('../calendar')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },

  languagePicker: {
    alignItems: 'flex-end',
    padding: 20,
  },

  bottomGradient: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    paddingTop: 40,
  },

  logoRow: {
    alignItems: 'center',
    marginBottom: 15,
  },

  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 25,
  },

  button: {
    backgroundColor: '#30c2b7',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    width: 150,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    width: 150,
  },
};
