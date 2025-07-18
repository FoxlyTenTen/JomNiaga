import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function BusinessTypeScreen() {
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();
  const { selectedDate } = useLocalSearchParams();

  useEffect(() => {
    console.log('Received Date from Calendar:', selectedDate);
  }, [selectedDate]);

  const handleNext = () => {
    if (selectedType) {
      router.push({
        pathname: '/industry', // Replace with your next screen
        params: { 
          businessType: selectedType,
          selectedDate: selectedDate,
        },
      });
    } else {
      alert('Please select a business type.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          Icon={() => <Text style={{ marginLeft: 5 }}>▼</Text>}
        />
      </View>

      {/* Progress Bar */}
      <Text style={styles.business}>Business Detail</Text>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      {/* Title */}
      <Text style={styles.question}>What type of business are{'\n'}you starting?</Text>

      {/* Options */}
      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={[
            styles.optionBox,
            selectedType === 'solopreneur' && styles.optionBoxSelected,
          ]}
          onPress={() => setSelectedType('solopreneur')}
        >
          <Text style={styles.optionText}>Solopreneur/{'\n'}Enterprise</Text>
          <Ionicons name="person-outline" size={32} color={selectedType === 'solopreneur' ? '#30c2b7' : '#999'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionBox,
            selectedType === 'sdn_bhd' && styles.optionBoxSelected,
          ]}
          onPress={() => setSelectedType('sdn_bhd')}
        >
          <Text style={styles.optionText}>SDN BHD (Private{'\n'}Limited Company)</Text>
          <FontAwesome5 name="store" size={28} color={selectedType === 'sdn_bhd' ? '#30c2b7' : '#999'} />
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 30 },
  languagePicker: { alignItems: 'flex-end', marginBottom: 30 },
  progressBar: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 40,
    overflow: 'hidden',
  },
  progressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: '#30c2b7',
  },
  business: {
    fontSize: 15,
    marginBottom: 10,
    color: 'grey',
  },
  question: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#30c2b7',
    textAlign: 'left',
    marginBottom: 30,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  optionBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  optionBoxSelected: {
    borderColor: '#30c2b7',
    backgroundColor: '#e6f4f1',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonRow: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  nextButton: {
    flex: 1,
    marginLeft: 20,
    backgroundColor: '#30c2b7',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
    width: 150,
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
    width: 150,
  },
};
