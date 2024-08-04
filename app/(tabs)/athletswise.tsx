// TestChart.js
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import AthleteWiseAnalysis from '@/components/components/athlets';

const AthlestWise = () => {
  const isMobile = Dimensions.get('window').width < 768;

  return (
    <View style={styles.container}>
     <AthleteWiseAnalysis/>
    </View>
  );
};

export default AthlestWise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});
