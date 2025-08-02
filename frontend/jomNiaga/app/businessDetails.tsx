import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Button, Platform } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import QRCode from 'react-native-qrcode-svg';
import { shareAsync } from 'expo-sharing';

export default function BusinessProfileReceipt() {
  const receiptRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const businessData = {
    "Business Name": "NASI PAIPON KL SDN BHD",
    "SSM Registration Number": "202301045678",
    "Business Type": "Sole Proprietor",
    "Industry / Sector": "Food & Beverage",
    "Year Established": "2023",
    "Owner/Director Name": "Muhammad Izzul Danish",
    "Phone": "012-3456789",
    "Email": "izzul@gmail.com",
    "Business Address": "Universiti Tenaga Nasional (UNITEN), Putrajaya Campus, Jalan Kajang - Puchong, 43000 Kajang, Selangor",
  };

  const handleDownload = async () => {
    if (!status?.granted) {
      await requestPermission();
    }

    const uri = await captureRef(receiptRef, {
      format: 'png',
      quality: 1,
    });

    if (Platform.OS === 'android') {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Receipts', asset, false);
      alert('Receipt saved to gallery!');
    } else {
      await shareAsync(uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.receipt} ref={receiptRef} collapsable={false}>
          <Text style={styles.header}>Business Profile Receipt</Text>
          <View style={styles.line} />
          {Object.entries(businessData).map(([label, value]) => (
            <View key={label} style={styles.fieldRow}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
          <View style={styles.qrContainer}>
            <QRCode value="https://jomniaga.my/business/202301045678" size={120} />
            <Text style={styles.qrLabel}>Scan to verify</Text>
          </View>
        </View>

        <Button title="Download Receipt" onPress={handleDownload} color="#30c2b7" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
    alignItems: 'center',
  },
  receipt: {
    width: '100%',
    backgroundColor: '#fefefe',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#30c2b7',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  fieldRow: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    color: '#333',
    marginTop: 2,
  },
  qrContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  qrLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
});
