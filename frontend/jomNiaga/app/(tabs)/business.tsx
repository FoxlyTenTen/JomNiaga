import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function FinancingOptions() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [predictedImpact, setPredictedImpact] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    const mockImpact = 'Moderate';
    const colorMap = {
      Safe: '#30c2b7',
      Moderate: '#f5a623',
      'High Risk': '#ff4d4f',
    };
    setPredictedImpact({ impact: mockImpact, color: colorMap[mockImpact] || '#888' });
    setLoading(false);
  }, []);

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const newMessages = [...chatMessages, { role: 'user', text: chatInput }];
    setChatMessages(newMessages);

    try {
      const res = await fetch('https://zayed43.app.n8n.cloud/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput }),
      });

      const data = await res.json();
      const reply = Array.isArray(data) && data[0]?.output ? data[0].output : 'No reply.';
      setChatMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (err) {
      setChatMessages((prev) => [...prev, { role: 'bot', text: 'Error sending message.' }]);
    }

    setChatInput('');
  };

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
        <Text style={{ marginTop: 10, color: '#666' }}>Preparing loan options...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.financingTop}>
          <Image source={require('@/assets/images/store.png')} style={styles.financingIcon} />
          <Text style={styles.financingTitle}>Business Financing Options</Text>
          <Text style={styles.financingSubtitle}>You can get up to</Text>
          <Text style={styles.financingAmount}>RM 5,000</Text>
          <Text style={styles.financingImpact}>
            Your Repayment Impact:{' '}
            <Text style={{ color: '#ff4d4f', fontWeight: 'bold' }}>● High Risk</Text>
          </Text>
          <TouchableOpacity style={styles.financingApplyButton}>
            <Text style={styles.financingApplyText}>Apply Now for Free</Text>
          </TouchableOpacity>
        </View>

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
                <Text style={[styles.impactText, { color: predictedImpact?.color || '#30c2b7' }]}>  Repayment Impact: {predictedImpact?.impact || 'Safe'}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={() => router.push('/maybanksme')}>
              <View style={styles.buttonGradient}>
                <Text style={styles.applyText}>Apply</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.chatIcon}
        onPress={() => setChatVisible(!chatVisible)}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {chatVisible && (
        <View style={styles.chatPopup}>
          <ScrollView style={styles.chatMessages} contentContainerStyle={{ padding: 10 }}>
            {chatMessages.map((msg, i) => (
              <View
                key={i}
                style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.botBubble]}
              >
                <Text style={styles.bubbleText}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.chatInputRow}>
            <TextInput
              value={chatInput}
              onChangeText={setChatInput}
              placeholder="Ask me anything..."
              style={styles.chatInput}
              onSubmitEditing={sendChatMessage}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={sendChatMessage}>
              <Ionicons name="send" size={22} color="#30c2b7" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd', padding: 20, paddingTop: 60 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
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
    backgroundColor: '#30c2b7',
    alignItems: 'center',
    paddingVertical: 12,
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#30c2b7',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatPopup: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 300,
    height: 360,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  chatMessages: {
    flex: 1,
    maxHeight: 260,
  },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    fontSize: 14,
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 6,
  },
  userBubble: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  bubbleText: {
    fontSize: 13.5,
    lineHeight: 18,
  },
  financingTop: {
    backgroundColor: '#30c2b7',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 25,
  },
  financingIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: '#fff',
  },
  financingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  financingSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
  },
  financingAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  financingImpact: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 14,
  },
  financingApplyButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  financingApplyText: {
    color: '#30c2b7',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
