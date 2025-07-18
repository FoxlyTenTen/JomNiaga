import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import Checkbox from 'expo-checkbox';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SSMOCRScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { selectedDate, businessType, industry, address1, address2, postcode, city, state } = params;

  useEffect(() => {
    console.log("Received from previous page:");
    console.log({ selectedDate, businessType, industry, address1, address2, postcode, city, state });
  }, []);

  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Camera permission is required");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setBase64Image(result.assets[0].base64);
    }
  };

  const processOCR = async () => {
    if (!agreed) {
      alert("Please agree to the PDPA terms.");
      return;
    }

    if (!base64Image) {
      alert("Please capture your IC first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://jomniagabackend.onrender.com/ocr', { // Replace with your ngrok URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Image }),
      });

      if (!response.ok) {
        throw new Error("OCR API failed");
      }

      const extractedJSON = await response.json();

      console.log("Extracted JSON:", extractedJSON);

      router.push({
        pathname: "/signature",
        params: {
          ...params,
          extractedText: JSON.stringify(extractedJSON),
        }
      });

    } catch (error) {
      console.error("OCR API error:", error);
      alert("Error reading IC details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const skipScan = () => {
    if (!agreed) {
      alert("Please agree to the PDPA terms before proceeding.");
      return;
    }

    router.push({
      pathname: "/signature",
      params: {
        ...params,
        extractedText: JSON.stringify({
          ic_number: "",
          full_name: "",
          address_1: "",
          address_2: "",
          postcode: "",
          city: "",
          state: "",
          religion: "",
          gender: "",
          nationality: ""
        }),
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.language}>
        <Text style={styles.languageText}>🇲🇾 Malaysia</Text>
      </View>

      <Text style={styles.stepTitle}>Business Details</Text>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <Text style={styles.header}>Let’s Register Your SSM</Text>

      <View style={styles.stepContainer}>
        <View style={styles.stepCircle}>
          <Text style={styles.stepNumber}>1</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.stepText}>Please get your Identification Card (IC) ready.</Text>
          <Text style={styles.stepSubText}>We will scan it to automatically fill in your details for faster registration.</Text>
        </View>
      </View>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Image source={require('../assets/images/ic.jpeg')} style={styles.image} />
      )}

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={agreed}
          onValueChange={setAgreed}
          color={agreed ? '#30c2b7' : undefined}
        />
        <Text style={styles.checkboxText}>
          By proceeding, you agree to the PDPA (Personal Data Protection Act) terms below.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanButton} onPress={loading ? null : (imageUri ? processOCR : pickImage)}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.scanButtonText}>📷 Scan Now</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.skipButton} onPress={skipScan}>
        <Text style={styles.skipButtonText}>Skip & Fill Manually</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 30 },
  language: { alignItems: 'flex-end', marginBottom: 10 },
  languageText: { color: '#30c2b7', fontSize: 14, fontWeight: 'bold' },
  stepTitle: { color: 'grey', fontSize: 14, marginBottom: 5 },
  progressBar: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    width: '90%',
    height: '100%',
    backgroundColor: '#30c2b7',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#30c2b7',
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#30c2b7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: { color: '#fff', fontWeight: 'bold' },
  stepText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  stepSubText: { fontSize: 12, color: '#888', marginTop: 5 },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxText: { fontSize: 12, color: '#666', marginLeft: 10, flex: 1 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#e6f4f1',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#30c2b7',
    fontWeight: 'bold',
  },
  scanButton: {
    flex: 1,
    marginLeft: 20,
    backgroundColor: '#30c2b7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
  skipButtonText: {
    color: '#30c2b7',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
