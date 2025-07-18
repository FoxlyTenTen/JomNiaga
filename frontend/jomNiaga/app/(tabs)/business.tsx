import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function FinancingOptions() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [predictedImpact, setPredictedImpact] = useState(null);

  const userFinancialData = {
    Avg_Monthly_Sales: 50000,
    Avg_Monthly_Expenses: 30000,
    Volatility: 0.25,
    Existing_Debt: 40000,
    Loan_Request: 20000,
    Net_Operating_Cash_Flow: 20000,
    DSR: 2.0
  };

  useEffect(() => {
    fetch('https://loan-eligibility-ml.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userFinancialData),
    })
      .then(res => res.json())
      .then(data => {
        console.log("AI Model Response:", data);
        const risk = data.Risk_Category;

        const colorMap = {
          "Safe": "#30c2b7",
          "Moderate": "#f5a623",
          "High Risk": "#ff4d4f"
        };

        setPredictedImpact({
          impact: risk,
          color: colorMap[risk] || '#888'
        });
      })
      .catch(err => {
        console.error(err);
        Alert.alert("Error", "Failed to fetch loan eligibility. Showing default options.");
        setPredictedImpact({
          impact: 'Safe',
          color: '#30c2b7'
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const loans = [
    {
      id: 1,
      title: 'TEKUN Mikro Financing',
      description: 'For new and existing micro businesses',
      interest: '4.0% per annum (Flat)',
      monthly: 'RM 350',
      tenure: '12 – 60 months',
      amount: 'RM 5000–RM50000',
      logo: require('@/assets/images/tekun.png'),
    },
    {
      id: 2,
      title: 'Maybank SME First Loan',
      description: 'For working capital or digitisation expenses',
      interest: 'From 5.5% per annum',
      monthly: 'RM 620',
      tenure: '12 – 84 months',
      amount: 'RM 10000–RM100000',
      logo: require('@/assets/images/maybank.png'),
    },
    {
      id: 3,
      title: 'Agrobank Micro AgroBiz Loan',
      description: 'Special financing for small agro businesses',
      interest: '3.5% per annum (Flat Rate)',
      monthly: 'RM 280',
      tenure: '12 – 60 months',
      amount: 'RM 2000–RM30000',
      logo: require('@/assets/images/agrobank.png'),
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#30c2b7" />
        <Text style={{ marginTop: 10, color: '#666' }}>Checking loan eligibility...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#30c2b7', '#26a69a']} style={styles.header}>
          <Ionicons name="briefcase-outline" size={40} color="#fff" />
          <Text style={styles.headerTitle}>Business Financing Options</Text>
        </LinearGradient>

        {loans.map((loan) => (
          <View key={loan.id} style={styles.card}>
            <View style={styles.topRow}>
              <Image source={loan.logo} style={styles.logo} />
              <View style={styles.textGroup}>
                <Text style={styles.title}>{loan.title}</Text>
                <Text style={styles.description}>{loan.description}</Text>
              </View>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.detail}>Interest Rate: {loan.interest}</Text>
              <Text style={styles.detail}>Monthly Payment: {loan.monthly}</Text>
              <Text style={styles.detail}>Tenure: {loan.tenure}</Text>
              <Text style={styles.detail}>Loan Amount: {loan.amount}</Text>

              <View style={styles.repaymentImpact}>
                <Ionicons name="checkmark-circle" size={16} color={predictedImpact?.color || '#30c2b7'} />
                <Text style={[styles.impactText, { color: predictedImpact?.color || '#30c2b7' }]}>
                  {'  '}Repayment Impact: {predictedImpact?.impact || 'Safe'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => router.push('/maybanksme')}
            >
              <LinearGradient colors={['#30c2b7', '#26a69a']} style={styles.buttonGradient}>
                <Text style={styles.applyText}>Apply Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd', padding: 20, paddingTop: 60 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#e0f2f1',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  detailGroup: {
    marginTop: 10,
  },
  detail: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
  },
  repaymentImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  impactText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  applyButton: {
    marginTop: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
