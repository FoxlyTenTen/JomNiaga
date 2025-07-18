import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';



export default function IndustryScreen() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();
  const { selectedDate, businessType } = useLocalSearchParams();

  useEffect(() => {
    console.log('Received Date:', selectedDate);
    console.log('Received Business Type:', businessType);
  }, [selectedDate, businessType]);

  const handleNext = () => {
    if (selectedIndustry) {
      router.push({
        pathname: '/location', // Replace with your next page
        params: { 
          selectedDate, 
          businessType, 
          industry: selectedIndustry 
        },
      });
    } else {
      alert('Please select an industry.');
    }
  };

  const renderOption = (label, value, icon) => (
    <TouchableOpacity
      style={[
        styles.optionBox,
        selectedIndustry === value && styles.optionBoxSelected,
      ]}
      onPress={() => setSelectedIndustry(value)}
    >
      <Text style={styles.optionText}>{label}</Text>
      {icon}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Language Picker */}
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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

      <Text style={styles.question}>What is your business{'\n'}industry?</Text>

      <Text style={styles.sectionTitle}>Frequently selected industries</Text>

      <View style={styles.optionsGrid}>
        {renderOption('Food & Restaurant', 'food', <MaterialCommunityIcons name="silverware-fork-knife" size={28} color={selectedIndustry === 'food' ? '#30c2b7' : '#999'} />)}
        {renderOption('Retail', 'retail', <FontAwesome5 name="shopping-bag" size={24} color={selectedIndustry === 'retail' ? '#30c2b7' : '#999'} />)}
        {renderOption('Accommodation & Hotel', 'hotel', <FontAwesome5 name="bed" size={24} color={selectedIndustry === 'hotel' ? '#30c2b7' : '#999'} />)}
      </View>

      <Text style={styles.sectionTitle}>All Industries</Text>

      <View style={styles.optionsGrid}>
        {renderOption('Food & Restaurant', 'food', <MaterialCommunityIcons name="silverware-fork-knife" size={28} color={selectedIndustry === 'food' ? '#30c2b7' : '#999'} />)}
        {renderOption('Retail', 'retail', <FontAwesome5 name="shopping-bag" size={24} color={selectedIndustry === 'retail' ? '#30c2b7' : '#999'} />)}
        {renderOption('Accommodation & Hotel', 'hotel', <FontAwesome5 name="bed" size={24} color={selectedIndustry === 'hotel' ? '#30c2b7' : '#999'} />)}
        {renderOption('Amusement & Entertainment', 'amusement', <Ionicons name="mic-outline" size={28} color={selectedIndustry === 'amusement' ? '#30c2b7' : '#999'} />)}
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
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingBottom: 0, marginTop: 30 },
  languagePicker: { alignItems: 'flex-end', marginBottom: 30 },
  scrollContent: {
  paddingBottom: 130, // To avoid overlap with the bottom buttons
},
  progressBar: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    width: '60%',
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 10,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    marginBottom: 15,
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
    left: 10,
    right: 10,
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
