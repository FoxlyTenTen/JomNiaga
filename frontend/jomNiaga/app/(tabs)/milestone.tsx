import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function MilestonePage() {
  const router = useRouter();

  const milestones = [
    {
      id: 1,
      title: 'Register with SSM',
      status: 'Completed',
      icon: require('@/assets/images/ssm.png'),
      action: () => router.push('/compProgress'),
      completed: true,
    },
    {
      id: 2,
      title: 'Open Business Account *',
      status: 'Completed',
      icon: require('@/assets/images/bank.png'),
      action: () => router.push('/bank-registration'),
      completed: true,
    },
    {
      id: 3,
      title: 'Register with EPF & SOCSO *',
      status: 'Completed',
      icon: require('@/assets/images/epf.png'),
      action: () => router.push('/epf-socso-registration'),
      completed: true,
    },
    {
      id: 4,
      title: 'Apply for Necessary Licenses',
      status: 'Completed',
      icon: require('@/assets/images/license.png'),
      action: () => router.push('/license-application'),
      completed: true,
    },
    {
      id: 5,
      title: 'Generate Business QR Payment',
      status: 'Completed',
      icon: require('@/assets/images/duitnow.png'),
      action: () => router.push('/qr-generation'),
      completed: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Your Milestone</Text>
        <Text style={styles.subHeader}>Complete all milestones to start your business</Text>

        <View style={styles.timeline}>
          {milestones.map((milestone, index) => (
            <View key={milestone.id} style={styles.milestoneItem}>
              <View style={styles.numberCircleFlat}>
              <Text style={styles.numberText}>
              {milestone.completed ? '✓' : milestone.id}</Text>

            </View>


              <View style={styles.milestoneContent}>
                <View style={styles.milestoneTopRow}>
                  <Image source={milestone.icon} style={styles.icon} />
                  <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                </View>
                <View style={styles.milestoneBottomRow}>
                  <Text style={styles.statusText}>{milestone.status}</Text>
                  {milestone.action && (
                    <TouchableOpacity style={styles.goButton} onPress={milestone.action}>
                      <Text style={styles.goButtonText}>Go now</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {index !== milestones.length - 1 && (
                <View
                  style={[
                    styles.verticalLine,
                    milestone.completed && milestones[index + 1]?.completed && styles.verticalLineCompleted,
                  ]}
                />
              )}


            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd', padding: 20, paddingTop: 60 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#30c2b7',
    marginBottom: 6,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  timeline: {
    paddingVertical: 10,
    position: 'relative',
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
    position: 'relative',
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  numberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  milestoneContent: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0f2f1',
  },
  milestoneTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 10,
    resizeMode: 'contain',
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  milestoneBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    color: '#999',
    fontSize: 13,
    fontStyle: 'italic',
  },
  goButton: {
    backgroundColor: '#30c2b7',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
    shadowColor: '#30c2b7',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  goButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  numberCircleFlat: {
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15,
  backgroundColor: '#30c2b7', // flat teal
},
verticalLine: {
  position: 'absolute',
  top: 0,                // ← Start from top of numberCircle
  left: 18,
  width: 2,
  height: 80,            // ← Long enough to reach next numberCircle
  backgroundColor: '#e0f2f1',
  zIndex: -1,
},

verticalLineCompleted: {
  backgroundColor: '#30c2b7', // completed: active color
},

});
