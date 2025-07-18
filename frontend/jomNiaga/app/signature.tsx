import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SignaturePage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    selectedDate,
    businessType,
    industry,
    address1,
    address2,
    postcode,
    city,
    state,
    extractedText
  } = params;

  useEffect(() => {
    console.log("Received in Signature Page:");
    console.log({ selectedDate, businessType, industry, address1, address2, postcode, city, state, extractedText });
  }, []);

  const [signature, setSignature] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef();

  const handleOK = (sig) => {
    console.log("Signature captured");
    setSignature(sig); // Base64 image
    setIsSubmitted(true); // Mark as submitted
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setSignature(null);
    setIsSubmitted(false);
  };

  const handleSubmitSignature = () => {
    ref.current.readSignature(); // This triggers onOK
  };

  const handleNext = () => {
    if (!signature || signature.trim() === "" || signature === "data:image/png;base64,") {
      alert("Please provide your signature before proceeding.");
      return;
    }

    router.push({
  pathname: '/completed',
  params: {
    selectedDate,
    businessType,
    industry,
    address1,
    address2,
    postcode,
    city,
    state,
    extractedText,  // 🔧 FIX: ensure stringified
    signature,
  }
});
  };

  console.log(extractedText)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.language}>
        <Text style={styles.languageText}>🇲🇾 Malaysia</Text>
      </View>

      <Text style={styles.stepTitle}>Business Details</Text>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <Text style={styles.header}>Kindly sign below to complete this process.</Text>
      <Text style={styles.subText}>Digital signature is required to continue.</Text>

      <View style={styles.signatureContainer}>
        {signature ? (
          <Image
            source={{ uri: signature }}
            style={styles.signatureImage}
          />
        ) : (
          <SignatureScreen
            ref={ref}
            onOK={handleOK}
            onEmpty={() => alert("You haven't signed yet!")}
            onClear={() => {
              setSignature(null);
              setIsSubmitted(false);
            }}
            backgroundColor="#fff"
            penColor="#000"
            descriptionText=""
            webStyle={`.m-signature-pad--footer {display: none; margin: 0px;}`}
          />
        )}
      </View>

      {!signature && (
        <TouchableOpacity style={styles.editButton} onPress={handleSubmitSignature}>
          <Text style={styles.editButtonText}>Submit Signature</Text>
        </TouchableOpacity>
      )}

      {(!isSubmitted && signature) && (
        <TouchableOpacity style={styles.editButton} onPress={handleClear}>
          <Text style={styles.editButtonText}>Clear</Text>
        </TouchableOpacity>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 30 },
  language: { alignItems: 'flex-end', marginBottom: 10 },
  languageText: { color: '#30c2b7', fontSize: 14, fontWeight: 'bold' },
  stepTitle: { color: 'grey', fontSize: 14, marginBottom: 5 },
  progressBar: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#30c2b7',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#30c2b7',
    marginBottom: 10,
    textAlign: 'center'
  },
  subText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center'
  },
  signatureContainer: {
    borderWidth: 2,
    borderColor: '#30c2b7',
    borderRadius: 10,
    height: 250,
    width: '100%',
    marginBottom: 15,
    overflow: 'hidden',
  },
  signatureImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  editButton: {
    backgroundColor: '#30c2b7',
    paddingVertical: 12,
    borderRadius: 25,
    width: 180,
    alignSelf: 'center',
    marginBottom: 10
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#e6f4f1',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#30c2b7',
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    marginLeft: 20,
    backgroundColor: '#30c2b7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
