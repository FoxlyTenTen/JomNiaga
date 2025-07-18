import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function JomNiagaOnboarding() {
  return (
    <SafeAreaView style={styles.container}>
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
          Icon={() => <Text style={{ marginLeft: 5 }}>▼</Text>}
        />
      </View>

      <Image
        source={require('../assets/images/onboarding.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        {/* Placeholder for Icon */}
        <View style={styles.iconPlaceholder}>
          {/* Put your storefront icon here later */}
          <Text style={styles.iconText}>🏪</Text>
        </View>

        <Text style={styles.logo}>JomNiaga</Text>

        <Text style={styles.title}>
          Simplified Your Onboarding{"\n"}As New Entrepreneurs
        </Text>

        <Text style={styles.subtitle}>
          Launch Your Business, No Stress — JomNiaga Simplifies It All
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Get Started Pressed')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  languagePicker: { alignItems: 'flex-end', marginBottom: 10 },
  image: { width: '100%', height: 250 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconPlaceholder: {
    width: 50,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: { fontSize: 30 },
  logo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#30c2b7' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#30c2b7',
    textAlign: 'center',
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#30c2b7',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#000',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#000',
    paddingRight: 30,
  },
};
