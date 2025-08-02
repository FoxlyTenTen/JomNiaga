import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function LocationScreen() {
  const router = useRouter();
  const { selectedDate, businessType, industry } = useLocalSearchParams();

  const [form, setForm] = useState({
    address1: 'Universiti Tenaga Nasional (UNITEN)',
    address2: 'Putrajaya Campus',
    postcode: '43000',
    city: 'Kajang',
    state: 'Selangor',
  });

  useEffect(() => {
    console.log('Date:', selectedDate);
    console.log('Business Type:', businessType);
    console.log('Industry:', industry);
  }, []);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleNext = () => {
    const { address1, postcode, city, state } = form;

    if (!address1 || !postcode || !city || !state) {
      alert('Please fill all required fields.');
      return;
    }

    router.push({
      pathname: '/ssm',
      params: {
        selectedDate,
        businessType,
        industry,
        ...form,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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

        <Text style={styles.question}>Where do you want to start{'\n'}your business?</Text>
        <Text style={styles.subText}>Fill the form below</Text>

        {/* Form Fields */}
        <TextInput
          style={styles.input}
          placeholder="Address 1 *"
          value={form.address1}
          onChangeText={(text) => handleInputChange('address1', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address 2"
          value={form.address2}
          onChangeText={(text) => handleInputChange('address2', text)}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 10 }]}
            placeholder="Postcode *"
            keyboardType="number-pad"
            value={form.postcode}
            onChangeText={(text) => handleInputChange('postcode', text)}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="City *"
            value={form.city}
            onChangeText={(text) => handleInputChange('city', text)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="State *"
          value={form.state}
          onChangeText={(text) => handleInputChange('state', text)}
        />
      </ScrollView>

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
  scrollContent: { paddingBottom: 150 },
  languagePicker: { alignItems: 'flex-end', marginBottom: 30 },
  progressBar: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    width: '80%',
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
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#30c2b7',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
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
