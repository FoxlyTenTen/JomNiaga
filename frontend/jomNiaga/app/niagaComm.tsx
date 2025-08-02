import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';

export default function NiagaCommunity() {
  const router = useRouter();

  const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch?v=m0uzp4-u-jA'; 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="storefront-outline" size={32} color="#30c2b7" />
          <Text style={styles.headerTitle}>Niaga Community</Text>
        </View>

        {/* Featured Learning Video */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Learning Video</Text>
          <View style={styles.videoContainer}>
            <WebView
              style={{ borderRadius: 12 }}
              javaScriptEnabled
              source={{ uri: YOUTUBE_VIDEO_URL }}
            />
          </View>
          <Text style={styles.videoLabel}>How to start selling via the Shopee Seller Centre</Text>
        </View>

        {/* Quick Guides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Guides</Text>
          <View style={styles.boxRow}>
            <TouchableOpacity style={styles.box} onPress={() => router.push('/')}>
              <Text style={styles.boxText}>E-Invoice Setup (LHDN)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => router.push('/')}>
              <Text style={styles.boxText}>Loan Application Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => router.push('./duitnow')}>
              <Text style={styles.boxText}>DuitNow Overview</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Community Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Highlights</Text>
          <TouchableOpacity style={styles.box} onPress={() => router.push('/mdec')}>
            <Text style={styles.boxText}>MDEC Digital Grant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => router.push('/')}>
            <Text style={styles.boxText}>Belia Niaga by MARA</Text>
          </TouchableOpacity>
        </View>

        {/* Success Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Success Stories</Text>
          <TouchableOpacity style={styles.storyBox} onPress={() => router.push('/cupcake')}>
            <Text style={styles.boxTitle}>Cupcake Aina</Text>
            <Text style={styles.boxSubtext}>
              Aina grew her cupcake orders from home to selling stores.
            </Text>
            <Text style={styles.boxTag}>@cupcake.aina</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  videoContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#000',
  },
  videoLabel: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  boxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  box: {
    flexBasis: '48%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#30c2b7',
  },
  boxText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  storyBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderColor: '#30c2b7',
    borderWidth: 1,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  boxSubtext: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
  boxTag: {
    fontSize: 12,
    color: '#30c2b7',
    fontStyle: 'italic',
  },
});
