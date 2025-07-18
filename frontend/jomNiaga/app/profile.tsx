import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Router, useRouter } from 'expo-router';



const screenWidth = Dimensions.get("window").width;
const router = useRouter();

export default function BusinessProfile() {
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
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Business Performance</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <Text style={styles.viewMore}>See more...</Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricTitle}>Avg Monthly Sales</Text>
            <Text style={styles.metricValue}>RM 3,500</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricTitle}>Avg Monthly Expenses</Text>
            <Text style={styles.metricValue}>RM 1,800</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricTitle}>Volatility</Text>
            <Text style={styles.metricValue}>12%</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricTitle}>Existing Debt</Text>
            <Text style={styles.metricValue}>RM 10,000</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricTitle}>Loan Request</Text>
            <Text style={styles.metricValue}>RM 50,000</Text>
          </View>
          <View style={styles.metricBox}>
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => router.replace('/(tabs)')}>
            Back to Home
          </Text>

        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 70},
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
    marginBottom: 20
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
    marginTop: 20
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
