// TestChart.js
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import SingleLineGraph from '@/components/components/singleLineGraph.native';

const OverAllCharts = () => {
  const isMobile = Dimensions.get('window').width < 768;

  return (
    <View style={styles.container}>
     <SingleLineGraph/>
    </View>
  );
};

export default OverAllCharts;

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
