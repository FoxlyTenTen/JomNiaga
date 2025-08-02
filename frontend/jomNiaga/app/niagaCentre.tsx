import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ServiceMarketplace() {
  const router = useRouter();

  const services = [
    {
      category: 'Product Branding',
      items: [
        {
          name: 'Logo Design',
          provider: 'Roslegacy Studio',
          price: 'From RM 50',
          image: require('@/assets/images/drawing.jpg'), // Replace with your own images
          route: '/logo-design',
        },
      ],
    },
    {
      category: 'Packaging & Delivery Support',
      items: [
        {
          name: 'Parcel Packing',
          provider: 'Raj.co Logistic',
          price: 'From RM 1.50/item',
          image: require('@/assets/images/parcel.jpg'),
          route: '/parcel-packing',
        },
        {
          name: 'Custom Sticker Printing',
          provider: 'Lee Printing',
          price: 'From RM 25/pack',
          image: require('@/assets/images/sticker.jpg'),
          route: '/sticker-printing',
        },
      ],
    },
    {
      category: 'Photography',
      items: [
        {
          name: 'Product Photography',
          provider: 'Lisa Tan',
          price: 'From RM 100',
          image: require('@/assets/images/photography.jpg'),
          route: '/product',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="storefront-outline" size={32} color="#30c2b7" />
          <Text style={styles.title}>Service Marketplace</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput placeholder="Search services" style={styles.searchInput} />
        </View>

        {/* Categories and Services */}
        {services.map((section, index) => (
          <View key={index} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>Category: {section.category}</Text>
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.card}
                onPress={() => router.push(item.route)}
              >
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.provider}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#30c2b7',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    borderColor: '#30c2b7',
    borderWidth: 1,
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 13,
    color: '#00a676',
    fontWeight: '500',
  },
});

