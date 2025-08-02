import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Clipboard,
  Alert,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

const screenWidth = Dimensions.get('window').width;

export default function BusinessWallet() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(slideAnim, {
      toValue: sidebarVisible ? -screenWidth : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  const handleCopy = () => {
    Clipboard.setString('97499872422222');
    Alert.alert('Copied', 'Account number copied to clipboard');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Signed out', 'You have been signed out.');
      toggleSidebar();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const sidebarLinks = [
    { label: 'About JomNiaga', icon: 'information-circle-outline', route: '/about' },
    { label: 'NiagaBot', icon: 'chatbubbles-outline', route: '../business' },
    { label: 'NiagaCommunity', icon: 'people-outline', route: '/niagaComm' },
    { label: 'NiagaCentre', icon: 'briefcase-outline', route: '/niagaCentre' },
    { label: 'Privacy', icon: 'shield-outline', route: '/privacy' },
    { label: 'Settings', icon: 'settings-outline', route: '/settings' },
  ];

  const transactions = [
    {
      id: 1,
      type: 'Receive',
      from: 'NASI PAIPON KL SDN BHD',
      amount: 150.0,
      time: '17:30',
      method: 'DuitNow Transfer',
    },
    {
      id: 2,
      type: 'Send',
      from: 'NASI PAIPON KL SDN BHD',
      amount: 150.0,
      time: '17:30',
      method: 'DuitNow Transfer',
    },
    {
      id: 3,
      type: 'Receive',
      from: 'NASI PAIPON KL SDN BHD',
      amount: 150.0,
      time: '17:30',
      method: 'DuitNow Transfer',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {sidebarVisible && <Pressable style={styles.overlay} onPress={toggleSidebar} />}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.sidebarHeader}>
          <View style={styles.profileSection}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.name}>Nasi Paipon</Text>
              <Text style={styles.email}>nasipaiponextradeals@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.sidebarItems}>
          {sidebarLinks.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sidebarItem}
              onPress={() => {
                toggleSidebar();
                router.push(item.route);
              }}
            >
              <Ionicons name={item.icon} size={20} color="#111" />
              <Text style={styles.sidebarLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.logoutItem} onPress={handleSignOut}>
            <Ionicons name="power-outline" size={20} color="red" />
            <Text style={styles.logoutLabel}>Log out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.leftIcon} onPress={toggleSidebar}>
            <Feather name="menu" size={22} color="#30c2b7" />
          </TouchableOpacity>

          <Ionicons name="wallet-outline" size={52} color="#30c2b7" />
          <Text style={styles.headerTitle}>Business Wallet</Text>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Feather name="user" size={24} color="#30c2b7" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#98d1cdff', '#30c2b7', '#30c2b7', '#98d1cdff']}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceAmount}>RM 940.65</Text>
          <Text style={styles.balanceLabel}>Total Balance</Text>

          <TouchableOpacity style={styles.accountNumberContainer} onPress={handleCopy}>
            <Text style={styles.accountNumber}>97499872422222</Text>
            <Feather name="copy" size={18} color="#30c2b7" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/')}
          >
            <View style={styles.flatIconButton}>
              <Ionicons name="arrow-down-circle" size={26} color="#fff" />
            </View>
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/')}
          >
            <View style={styles.flatIconButton}>
              <Ionicons name="swap-horizontal" size={26} color="#fff" />
            </View>
            <Text style={styles.actionText}>Transaction</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/')}
          >
            <View style={styles.flatIconButton}>
              <Ionicons name="file-tray" size={26} color="#fff" />
            </View>
            <Text style={styles.actionText}>Statement</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.viewAllText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Ionicons
                  name={tx.type === 'Receive' ? 'arrow-down-circle' : 'arrow-up-circle'}
                  size={28}
                  color={tx.type === 'Receive' ? '#30c2b7' : '#ff4d4f'}
                />
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionFrom}>
                    {tx.type === 'Receive' ? 'Received from ' : 'Sent to '}
                    <Text style={{ fontWeight: 'bold' }}>{tx.from}</Text>
                  </Text>
                  <Text style={styles.transactionMethod}>{tx.method} | {tx.time}</Text>
                </View>
              </View>

              <Text style={[styles.transactionAmount, { color: tx.type === 'Receive' ? '#30c2b7' : '#ff4d4f' }]}>
                {tx.type === 'Receive' ? `+RM${tx.amount.toFixed(2)}` : `-RM${tx.amount.toFixed(2)}`}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20, paddingTop: 50 },
  headerContainer: { alignItems: 'center', marginBottom: 24, position: 'relative' },
  leftIcon: { position: 'absolute', left: 0, top: 10, backgroundColor: '#e0f2f1', padding: 10, borderRadius: 24 },
  headerTitle: { fontSize: 26, color: '#30c2b7', marginTop: 10, fontWeight: 'bold' },
  profileButton: { position: 'absolute', right: 0, top: 10, backgroundColor: '#e0f2f1', padding: 10, borderRadius: 24 },

  balanceCard: { borderRadius: 24, padding: 30, alignItems: 'center', marginBottom: 30, borderWidth: 1, borderColor: '#e0f2f1' },
  balanceAmount: { fontSize: 40, fontWeight: 'bold',  marginBottom: 6, color: 'white', },
  balanceLabel: { fontSize: 16, color: '#666', marginBottom: 18 },
  accountNumberContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f2f1', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 },
  accountNumber: { fontSize: 16, color: '#30c2b7', fontWeight: '600', marginRight: 12 },

  actionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  actionButton: { alignItems: 'center' },
  flatIconButton: { width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#30c2b7' },
  actionText: { fontSize: 14, color: '#444', fontWeight: '500' },

  transactionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  viewAllText: { fontSize: 14, color: '#30c2b7', fontWeight: '500' },

  transactionList: { backgroundColor: '#ffffff', borderRadius: 18, padding: 18 },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  transactionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  transactionDetails: { marginLeft: 16 },
  transactionFrom: { fontSize: 16, color: '#222', fontWeight: '500' },
  transactionMethod: { fontSize: 13, color: '#888', marginTop: 2 },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },

  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#00000055', zIndex: 10 },
  sidebar: { position: 'absolute', top: 0, left: 0, bottom: 0, width: screenWidth * 0.8, backgroundColor: '#fff', paddingTop: 50, zIndex: 20 },
  sidebarHeader: { backgroundColor: '#30c2b7', padding: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  profileSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  email: { fontSize: 12, color: '#fff' },
  sidebarItems: { padding: 20 },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12 },
  sidebarLabel: { fontSize: 16, color: '#111' },
  logoutItem: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 20, marginTop: 30 },
  logoutLabel: { fontSize: 16, color: 'red' },
});
