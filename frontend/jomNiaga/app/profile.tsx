import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

const screenWidth = Dimensions.get("window").width;

export default function BusinessProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#30c2b7" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.warningText}>⚠️ You need to sign in to view your profile.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/signIn')}>
          <Text style={styles.buttonText}>Go to Sign In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [3000, 3200, 3100, 4000, 3700, 3600, 3800],
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(48, 194, 183, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(136, 136, 136, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#30c2b7",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={require('@/assets/images/store.png')} style={styles.icon} />
          <View>
          
            <Text style={styles.businessName}>Nasi Paipon</Text>
            <Text style={styles.subtitle}>Get all insights of your business profile here</Text>

            <TouchableOpacity style={styles.businessIconButton} onPress={() => router.push('/businessDetails')}>
              <Image source={require('@/assets/images/check.png')} style={styles.businessIcon} />
              <Text style={styles.businessIconText}>Business Info</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bestProductCard}>
  <Text style={styles.bestProductTitle}>Best Selling Products</Text>
  <View style={styles.productRow}>
    <Image source={require('@/assets/images/nasiayam.png')} style={styles.productImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.productName}>Nasi Ayam</Text>
      <Text style={styles.productTime}>12:00 pm - 2:00 pm</Text>
    </View>
    <TouchableOpacity style={styles.seeMoreButton}>
      <Text style={styles.seeMoreText}>See More</Text>
    </TouchableOpacity>
  </View>
</View>


        <View style={styles.metricsRow}>
  <View style={styles.metricBox}>
    <Text style={styles.metricTitle}>Avg Monthly Sales</Text>
    <Text style={styles.metricValue}>RM 3,500</Text>
  </View>
  <View style={[styles.metricBox, styles.metricBoxLast]}>
    <Text style={styles.metricTitle}>Avg Monthly Expenses</Text>
    <Text style={styles.metricValue}>RM 1,800</Text>
  </View>
</View>

<View style={styles.metricsRow}>
  <View style={styles.metricBox}>
    <Text style={styles.metricTitle}>Volatility</Text>
    <Text style={styles.metricValue}>12%</Text>
  </View>
  <View style={[styles.metricBox, styles.metricBoxLast]}>
    <Text style={styles.metricTitle}>Existing Debt</Text>
    <Text style={styles.metricValue}>RM 10,000</Text>
  </View>
</View>

<View style={styles.metricsRow}>
  <View style={styles.metricBox}>
    <Text style={styles.metricTitle}>Loan Request</Text>
    <Text style={styles.metricValue}>RM 50,000</Text>
  </View>
  <View style={[styles.metricBox, styles.metricBoxLast]}>
    <Text style={styles.metricTitle}>Net Cash Flow</Text>
    <Text style={styles.metricValue}>RM 1,700</Text>
  </View>
</View>

<View style={styles.metricsRow}>
  <View style={[styles.metricBox, { width: '100%' }]}>
    <Text style={styles.metricTitle}>DSR (Debt Service Ratio)</Text>
    <Text style={styles.metricValueGreen}>28% - Stable</Text>
  </View>
</View>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 70 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  icon: { width: 50, height: 50, marginRight: 10 },
  businessName: { fontSize: 20, fontWeight: 'bold', color: '#30c2b7' },
  subtitle: { fontSize: 12, color: '#888' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#30c2b7', marginBottom: 10 },
  chart: { borderRadius: 10 },
  viewMore: { textAlign: 'right', color: '#30c2b7', marginTop: 5, textDecorationLine: 'underline' },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  metricBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#30c2b7',
    borderRadius: 10,
    padding: 15,
    width: '48%',
  },
  metricTitle: { fontSize: 12, color: '#888', marginBottom: 5 },
  metricValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  metricValueGreen: { fontSize: 16, fontWeight: 'bold', color: '#30c2b7' },
  button: {
    backgroundColor: '#30c2b7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  warningText: {
    fontSize: 16,
    color: '#ff4d4f',
    marginBottom: 20,
    textAlign: 'center',
  },businessIconButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
  backgroundColor: '#e0f7f5',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 20,
  alignSelf: 'flex-start',
},
businessIcon: {
  width: 20,
  height: 20,
  marginRight: 8,
  tintColor: '#30c2b7',
},
businessIconText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#30c2b7',
},
bestProductCard: {
  backgroundColor: '#f9f9f9',
  borderRadius: 12,
  padding: 16,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 5,
  elevation: 3,
},
bestProductTitle: {
  fontWeight: '600',
  fontSize: 14,
  marginBottom: 10,
  color: '#333',
},
productRow: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#30c2b7',
  borderRadius: 12,
  padding: 10,
},
productImage: {
  width: 60,
  height: 60,
  borderRadius: 8,
  marginRight: 12,
  resizeMode: 'cover',
  backgroundColor: '#fff',
},
productName: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
productTime: {
  color: '#e0f7f5',
  fontSize: 12,
  marginTop: 4,
},
seeMoreButton: {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 6,
  marginLeft: 10,
},
seeMoreText: {
  color: '#30c2b7',
  fontWeight: 'bold',
  fontSize: 12,
},
metricsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 14,
},
metricBox: {
  flex: 1,
  marginRight: 10,
  backgroundColor: '#fff',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#30c2b7',
  padding: 16,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 2,
},
// Remove right margin on even cards
metricBoxLast: {
  marginRight: 0,
},
metricTitle: {
  fontSize: 12,
  color: '#30c2b7',
  fontWeight: '600',
  marginBottom: 6,
},
metricValue: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
metricValueGreen: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#30c2b7',
},

});
