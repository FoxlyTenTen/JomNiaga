import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Router, useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';

export default function LoanApplicationPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [tenure, setTenure] = useState('36 Months');
  const [name, setName] = useState('NASI PAIPON KAMPUNG BARU');
  const [ssmNumber, setSsmNumber] = useState('002345678-X');
  const [contactPerson, setContactPerson] = useState('Ahmad bin Ali');
  const [icNumber, setIcNumber] = useState('880101-14-5678');
  const [phoneNumber, setPhoneNumber] = useState('974992742222');
  const [agreed, setAgreed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const router = useRouter()

  const handleSubmit = () => {
    if (!agreed || !confirmed) {
      alert('Please agree to the terms before submitting.');
      
      return;
    }
    alert('Form Submitted!');
    router.push('/submittedSme')
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={require('@/assets/images/maybank.png')} style={styles.icon} />
          <Text style={styles.title}>Maybank SME First Loan</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Loan Amount</Text>
          <View style={styles.row}>
            <Text style={styles.rmText}>RM</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={loanAmount}
              onChangeText={setLoanAmount}
            />
          </View>

          <Text style={styles.label}>Tenure</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={tenure}
              onValueChange={(itemValue) => setTenure(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="12 Months" value="12 Months" />
              <Picker.Item label="24 Months" value="24 Months" />
              <Picker.Item label="36 Months" value="36 Months" />
              <Picker.Item label="48 Months" value="48 Months" />
            </Picker>
          </View>

          <Text style={styles.repayment}>Estimated Monthly Repayment</Text>
          <Text style={styles.repaymentAmount}>RM 1450.00</Text>
        </View>

        <Text style={styles.sectionTitle}>Business Information</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            value={ssmNumber}
            onChangeText={setSsmNumber}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 5 }]}
              value={contactPerson}
              onChangeText={setContactPerson}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginLeft: 5 }]}
              value={icNumber}
              onChangeText={setIcNumber}
            />
          </View>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Text style={styles.sectionTitle}>Upload Required Documents</Text>
        <View style={styles.card}>
          <View style={styles.uploadRow}>
            <Image source={require('@/assets/images/mykad.png')} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>MyKad{"\n"}<Text style={styles.green}>Uploaded</Text></Text>
          </View>

          <View style={styles.uploadRow}>
            <Image source={require('@/assets/images/ssmCert.png')} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>SSM Certificate{"\n"}<Text style={styles.green}>Auto-pulled</Text></Text>
          </View>

          <View style={styles.uploadRow}>
            <Image source={require('@/assets/images/calendar.png')} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>6-Month{"\n"}<Text style={styles.green}>Upload Now</Text></Text>
          </View>

          <View style={styles.uploadRow}>
            <Image source={require('@/assets/images/einvoice.png')} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>E-invoice{"\n"}<Text style={styles.optional}>Optional</Text>{" "}<Text style={styles.green}>Upload Now</Text></Text>
          </View>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox value={agreed} onValueChange={setAgreed} color={agreed ? '#30c2b7' : undefined} />
          <Text style={styles.checkboxText}>I agree to share my business and financial data with Maybank for loan assessment</Text>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox value={confirmed} onValueChange={setConfirmed} color={confirmed ? '#30c2b7' : undefined} />
          <Text style={styles.checkboxText}>I confirm all information provided is true{"\n"}<Text style={styles.link}>PDPA Compliance Notice</Text></Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 70 },
  header: { alignItems: 'center', marginBottom: 20 },
  icon: { width: 50, height: 50, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#30c2b7' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 20
  },
  label: { color: '#666', marginBottom: 10, fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  rmText: { marginRight: 5, fontWeight: 'bold', fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#30c2b7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flex: 1
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#30c2b7',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  repayment: { color: '#888', marginTop: 10 },
  repaymentAmount: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#30c2b7', marginBottom: 10 },
  uploadRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  uploadIcon: { width: 30, height: 30, marginRight: 10 },
  uploadText: { fontSize: 14, color: '#333' },
  green: { color: '#30c2b7', fontWeight: 'bold' },
  optional: { color: '#888', fontStyle: 'italic' },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  checkboxText: { fontSize: 12, color: '#555', marginLeft: 10, flex: 1 },
  link: { color: '#30c2b7', textDecorationLine: 'underline' },
  submitButton: {
    backgroundColor: '#30c2b7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
