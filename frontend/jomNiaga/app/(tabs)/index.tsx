import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Clipboard,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function BusinessWallet() {
  const router = useRouter();

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
      type: 'Receive',
      from: 'NASI PAIPON KL SDN BHD',
      amount: 150.0,
      time: '17:30',
      method: 'DuitNow Transfer',
    },
    {
      id: 3,
      type: 'Send',
      from: 'NASI PAIPON KL SDN BHD',
      amount: 150.0,
      time: '17:30',
      method: 'DuitNow Transfer',
    },
  ];

  const handleCopy = () => {
    Clipboard.setString('97499872422222');
    Alert.alert('Copied', 'Account number copied to clipboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Wallet Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="wallet-outline" size={44} color="#30c2b7" />
          <Text style={styles.headerTitle}>Business Wallet</Text>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Feather name="user" size={22} color="#30c2b7" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={['#ffffff', '#f0fdfa']}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.balanceAmount}>RM 940.65</Text>
          <Text style={styles.balanceLabel}>Total Balance</Text>

          <TouchableOpacity style={styles.accountNumberContainer} onPress={handleCopy}>
            <Text style={styles.accountNumber}>97499872422222</Text>
            <Feather name="copy" size={16} color="#30c2b7" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/transfer')}>
            <LinearGradient colors={['#30c2b7', '#26a69a']} style={styles.iconButton}>
              <Ionicons name="swap-horizontal-outline" size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/transactions')}>
            <LinearGradient colors={['#30c2b7', '#26a69a']} style={styles.iconButton}>
              <Ionicons name="list-outline" size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/statement')}>
            <LinearGradient colors={['#30c2b7', '#26a69a']} style={styles.iconButton}>
              <Ionicons name="document-text-outline" size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Statement</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => router.push('/transactions')}>
            <Text style={styles.viewAllText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Ionicons
                  name={tx.type === 'Receive' ? 'arrow-down-circle' : 'arrow-up-circle'}
                  size={26}
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
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 22,
    color: '#30c2b7',
    marginTop: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  profileButton: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: '#e0f2f1',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  balanceCard: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0f2f1',
  },
  balanceAmount: {
    color: '#222',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  balanceLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
  },
  accountNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2f1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#b2f5f3',
  },
  accountNumber: {
    color: '#30c2b7',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
  },
  iconButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  actionText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#30c2b7',
    fontSize: 13,
    fontWeight: '500',
  },
  transactionList: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionDetails: {
    marginLeft: 14,
  },
  transactionFrom: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  transactionMethod: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
