import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function SubmittedSME() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const submitDataToFirestore = async () => {
      if (!user) {
        Alert.alert("Authentication Error", "User not signed in.");
        return;
      }

      const userDocRef = doc(db, "MSME_ID", user.uid);

      const payload = {
        user_id: user.uid,
        submitted_at: new Date(),
        ssm_details: {
          selectedDate: params.selectedDate || "",
          businessType: params.businessType || "",
          industry: params.industry || "",
          address1: params.address1 || "",
          address2: params.address2 || "",
          postcode: params.postcode || "",
          city: params.city || "",
          state: params.state || "",
        },
        ic_info: params.extractedText ? JSON.parse(params.extractedText) : {},
      };

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          // If document exists, update the data with a new conversation
          await updateDoc(userDocRef, {
              summary: payload,
              timestamp: new Date(),
          });
        } else {
          // If document does not exist, create a new document
          await setDoc(userDocRef, {

                summary: payload,
                timestamp: new Date(),
          });
        }

        setSubmitted(true);
        console.log("✅ Data saved for user:", user.uid);
        Alert.alert("Success", "Your data has been submitted to the cloud.");
      } catch (error) {
        console.error("❌ Firestore submission error:", error);
        Alert.alert("Error", "Failed to submit your data. Please try again.");
      }
    };

    submitDataToFirestore();
  }, [params]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={70} color="#30c2b7" />
        </View>

        <Text style={styles.title}>
          {submitted ? "Your application has been\nsubmitted successfully!" : "Submitting your application..."}
        </Text>

        {/* Application Summary Card */}
        <View style={styles.card}>
          <Text style={styles.loanTitle}>SSM MSME Registration</Text>
          <Text style={styles.loanSub}>ID: {user?.uid || "N/A"}</Text>

          <View style={styles.step}>
            <Feather name={submitted ? "check-circle" : "clock"} size={20} color={submitted ? "#30c2b7" : "#f5a623"} />
            <Text style={styles.stepText}>Application Submitted</Text>
            <Text style={submitted ? styles.completed : styles.inProgress}>
              {submitted ? "Completed" : "In Progress"}
            </Text>
          </View>

          <View style={styles.step}>
            <Feather name="clock" size={20} color="#f5a623" />
            <Text style={styles.stepText}>Document Verification</Text>
            <Text style={styles.inProgress}>In Progress</Text>
          </View>

          <Text style={styles.note}>
            Your data has been stored. You’ll be notified when the status updates.
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
