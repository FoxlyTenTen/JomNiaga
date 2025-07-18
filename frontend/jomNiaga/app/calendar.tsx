import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export default function CalendarScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleNext = () => {
    router.push({
      pathname: '/type', // Replace with your next screen
      params: { selectedDate: date.toISOString() },
    });
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
      <Text style={styles.question}>When do you want to start{'\n'}your business?</Text>

      {/* Calendar */}
      <TouchableOpacity style={styles.calendarBox} onPress={() => setShowPicker(true)}>
        <Text style={styles.calendarText}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}

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
    width: '20%', // Adjust progress %
    height: '100%',
    backgroundColor: '#30c2b7',
  },
  question: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#30c2b7',
    textAlign: 'left',
    marginBottom: 30,
  },
  calendarBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 40,
    
  },
  calendarText: {
    fontSize: 18,
    color: '#333',
  },
  business:{
    fontSize: 15,
    marginBottom: 10,
    color: 'grey',
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
