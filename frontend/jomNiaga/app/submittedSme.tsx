import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoanStatus() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Success Icon Only */}
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={70} color="#30c2b7" />
        </View>

        <Text style={styles.title}>Your application has been{"\n"}submitted successfully!</Text>

        {/* Loan Summary Card */}
        <View style={styles.card}>
          <Text style={styles.loanTitle}>Maybank SME First Loan</Text>
          <Text style={styles.loanSub}>RM 50,000   |   36 months</Text>

          <View style={styles.step}>
            <Feather name="check-circle" size={20} color="#30c2b7" />
            <Text style={styles.stepText}>Application Submitted</Text>
            <Text style={styles.completed}>Completed</Text>
          </View>

          <View style={styles.step}>
            <Feather name="clock" size={20} color="#f5a623" />
            <Text style={styles.stepText}>Document Verification</Text>
            <Text style={styles.inProgress}>In Progress</Text>
          </View>

          <View style={styles.step}>
            <Feather name="clock" size={20} color="#f5a623" />
            <Text style={styles.stepText}>Credit Assessment</Text>
            <Text style={styles.inProgress}>In Progress</Text>
          </View>

          <View style={styles.step}>
            <Feather name="circle" size={20} color="#ccc" />
            <Text style={styles.stepText}>Approval Decision</Text>
            <Text style={styles.pending}>Pending</Text>
          </View>

          <Text style={styles.note}>
            You'll be notified when your application status is updated.
          </Text>
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity style={styles.homeButton} onPress={() => router.replace('/(tabs)')}>
          <LinearGradient colors={['#30c2b7', '#26a69a']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  successIcon: { alignItems: 'center', marginBottom: 20 },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 30,
  },
  loanTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#30c2b7',
    marginBottom: 5,
  },
  loanSub: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  completed: {
    fontSize: 12,
    color: '#30c2b7',
    fontWeight: 'bold',
  },
  inProgress: {
    fontSize: 12,
    color: '#f5a623',
    fontWeight: 'bold',
  },
  pending: {
    fontSize: 12,
    color: '#ccc',
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
  homeButton: {
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
  },
  buttonGradient: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
