import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import OverallAnalysisHeatMap from  '@/components/components/overAllAnalysisHeatMap.native';
import { Platform } from 'react-native';

const overllAllHeatMap = () => {
  const isMobile = Dimensions.get('window').width < 768;

  return (
    <View style={styles.container}>
     <OverallAnalysisHeatMap/>
    </View>
  );;
};

export default overllAllHeatMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});
