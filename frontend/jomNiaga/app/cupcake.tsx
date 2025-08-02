import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CupcakeAina() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <Text style={styles.name}>Cupcake Aina</Text>
        <Text style={styles.location}>Shah Alam, Selangor</Text>
        <Image
          source={require('@/assets/images/cupcake.jpeg')} // Replace with your image path
          style={styles.profileImage}
        />

        {/* Testimonial */}
        <Text style={styles.title}>Home Baker Turned Registered Enterprised</Text>
        <Text style={styles.quote}>
          “I thought formalizing was hard. With JomNiaga, I registered, applied for MDEC grant,
          and now I even offer DuitNow QR!”
        </Text>

        {/* Business Highlights */}
        <View style={styles.card}>
          
          <Text style={styles.sectionTitle}>Business Highlights:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Registered her business via JomNiaga auto-fill SSM flow</Text>
            <Text style={styles.bullet}>• Applied for and received the MDEC Digital Grant</Text>
            <Text style={styles.bullet}>• Set up DuitNow QR to receive cashless payments at events</Text>
            <Text style={styles.bullet}>• Hired a sticker printing via the Niaga Centre to improve product packaging</Text>
            <Text style={styles.bullet}>• Increased orders from 20/month → 120+/month within 3 months</Text>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Feather name="star" size={18} color="#444" />
            <Text style={styles.tipsTitle}>Tips from Aina:</Text>
          </View>
          <Text style={styles.tip}>“Start with small steps — formalizing helped me build trust and join events.”</Text>
          <Text style={styles.tip}>“Apply for grants early. The MDEC grant helped me pay for packaging design!”</Text>
          <Text style={styles.tip}>“Don’t be afraid to sell online — start with TikTok or Shopee even if you don’t have a full website.”</Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 40,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#111',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#d3f0ef',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    color: '#222',
  },
  bulletList: {
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  tipsCard: {
    backgroundColor: '#fff9dc',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 40,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  tip: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  backButton: {
    backgroundColor: '#30c2b7',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginBottom: 30,
  },
  backText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
