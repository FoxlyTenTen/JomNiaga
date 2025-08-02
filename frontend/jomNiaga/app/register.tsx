import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(app);

  const registerHandler = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter the email and password');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'User registered!');
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert('Error', 'This account may already exist or something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="person-add-outline" size={44} color="#30c2b7" />
        <Text style={styles.headerTitle}>Register New User</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonWrapper} onPress={registerHandler}>
          <LinearGradient
            colors={['#30c2b7', '#26a69a']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('../signIn')} style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    color: '#30c2b7',
    marginTop: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0f2f1',
    backgroundColor: '#f0fdfa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    color: '#30c2b7',
    fontSize: 14,
    fontWeight: '500',
  },
});
