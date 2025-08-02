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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const [email, setEmail] = useState('mohdadlisyukri@gmail.com');
  const [password, setPassword] = useState('Adli2004');
  const router = useRouter();

  const loginHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in!');
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="log-in-outline" size={44} color="#30c2b7" />
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonWrapper} onPress={loginHandler}>
          <LinearGradient colors={['#30c2b7', '#26a69a']} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/register')} style={styles.registerLink}>
          <Text style={styles.registerText}>Don’t have an account? Register</Text>
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
  registerLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  registerText: {
    color: '#30c2b7',
    fontSize: 14,
    fontWeight: '500',
  },
});
