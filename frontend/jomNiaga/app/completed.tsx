import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ConfirmationPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    extractedText,
    selectedDate,
    businessType,
    industry,
    address1,
    address2,
    postcode,
    city,
    state,
    signature
  } = params;

  const defaultIcData = {
    ic_number: '',
    full_name: '',
    address_1: '',
    address_2: '',
    postcode: '',
    city: '',
    state: '',
    religion: '',
    gender: '',
    nationality: ''
  };

  const [icData, setIcData] = useState(defaultIcData);

  const [businessData, setBusinessData] = useState({
    selectedDate: selectedDate || '',
    businessType: businessType || '',
    industry: industry || '',
    address1: address1 || '',
    address2: address2 || '',
    postcode: postcode || '',
    city: city || '',
    state: state || '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (extractedText) {
      try {
        const parsedData = JSON.parse(extractedText);

        setIcData({
          ic_number: parsedData.ic_number || '',
          full_name: parsedData.full_name || '',
          address_1: parsedData.address_1 || '',
          address_2: parsedData.address_2 || '',
          postcode: parsedData.postcode || '',
          city: parsedData.city || '',
          state: parsedData.state || '',
          religion: parsedData.religion || '',
          gender: parsedData.gender || '',
          nationality: parsedData.nationality || '',
        });

        setBusinessData(prev => ({
          ...prev,
          address1: address1 || parsedData.address_1 || '',
          address2: address2 || parsedData.address_2 || '',
          postcode: postcode || parsedData.postcode || '',
          city: city || parsedData.city || '',
          state: state || parsedData.state || '',
        }));
      } catch (e) {
        console.error("Failed to parse extractedText:", e);
        alert("Invalid or malformed IC data. Please check the input.");
      }
    }
  }, [extractedText, address1, address2, postcode, city, state]);

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr; // fallback to raw if invalid

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const formatDateForStorage = (inputStr) => {
    const parts = inputStr.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`; // back to YYYY-MM-DD
    }
    return inputStr; // fallback if not in expected format
  };

  const handleBusinessChange = (field, value) => {
    if (field === 'selectedDate') {
      setBusinessData({ ...businessData, selectedDate: formatDateForStorage(value) });
    } else {
      setBusinessData({ ...businessData, [field]: value });
    }
  };

  const handleIcChange = (field, value) => {
    setIcData({ ...icData, [field]: value });
  };

  const handleFinalSubmit = () => {
    console.log("Final Business Data:", businessData);
    console.log("Final IC Data:", icData);
    alert("Registration submitted!");
    setIsSubmitted(true);
  };

  const formatBusinessLabel = (key) => {
    switch (key) {
      case 'selectedDate': return 'Business Start Date';
      case 'businessType': return 'Business Type';
      case 'industry': return 'Industry';
      case 'address1': return 'Business Address Line 1';
      case 'address2': return 'Business Address Line 2';
      case 'postcode': return 'Business Postcode';
      case 'city': return 'Business City';
      case 'state': return 'Business State';
      default: return key;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Confirm & Edit Your Details</Text>

        <Text style={styles.sectionTitle}>Business Information</Text>
        <View style={styles.section}>
          {Object.entries(businessData).map(([key, value]) => (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>{formatBusinessLabel(key)}</Text>
              <TextInput
                style={styles.input}
                value={key === 'selectedDate' ? formatDateForDisplay(value) : value}
                onChangeText={(text) => handleBusinessChange(key, text)}
              />
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>IC Information (Extracted)</Text>
        <View style={styles.section}>
          {Object.entries(icData).map(([key, value]) => (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>{key.replace(/_/g, ' ').toUpperCase()}</Text>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => handleIcChange(key, text)}
              />
            </View>
          ))}

          <Text style={styles.label}>Signature:</Text>
          {signature ? (
            <Image source={{ uri: signature }} style={styles.signatureImage} />
          ) : (
            <Text style={{ color: '#999', fontStyle: 'italic' }}>No signature provided</Text>
          )}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleFinalSubmit}>
          <Text style={styles.submitButtonText}>Submit Registration</Text>
        </TouchableOpacity>

        {isSubmitted && (
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: '#555' }]}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.submitButtonText}>Back to Home</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 30 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#30c2b7',
    marginBottom: 20,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#30c2b7',
    marginTop: 20,
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  signatureImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
    borderRadius: 5
  },
  submitButton: {
    backgroundColor: '#30c2b7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
