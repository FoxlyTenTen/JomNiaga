import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ProductPhotographyDetails() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.headerTitle}>Service Details</Text>

        {/* Service Image */}
        <Image
          source={require('@/assets/images/photography.jpg')} // Replace with actual path
          style={styles.serviceImage}
        />

        {/* Title & Provider */}
        <Text style={styles.serviceTitle}>Product Photography</Text>

        <View style={styles.providerRow}>
          <Image
            source={require('@/assets/images/parcel.jpg')} // Replace with actual path
            style={styles.providerPhoto}
          />
          <Text style={styles.providerName}>Lisa Tan</Text>
        </View>

        {/* Price */}
        <Text style={styles.priceLabel}>FROM <Text style={styles.priceValue}>RM 100</Text></Text>

        {/* Description */}
        <Text style={styles.descriptionLabel}>Description:</Text>
        <Text style={styles.descriptionText}>
          Make your products stand out with clean, professional images perfect for Shopee,
          Instagram, and websites. I provide high-resolution photography using lightboxes and DSLR
          cameras. Ideal for food, accessories, skincare, or handmade items. Fast turnaround.
          Editing included.
        </Text>

        {/* Contact Button */}
        <TouchableOpacity style={styles.contactButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.contactText}>Contact</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 20,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  providerPhoto: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  providerName: {
    fontSize: 14,
    color: '#444',
  },
  priceLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  priceValue: {
    color: '#00a676',
    fontWeight: '600',
  },
  descriptionLabel: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 24,
  },
  contactButton: {
    backgroundColor: '#30c2b7',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 28,
  },
  contactText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
