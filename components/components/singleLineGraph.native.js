import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, ActivityIndicator, Dimensions, ScrollView, StyleSheet, Platform } from 'react-native';
import { fetchAnalyseOverYearData } from '@/apis/common_apis/common_apis';

const SingleLineGraph = () => {
  const [participatingData, setParticipatingData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [athletesData, setAthletesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const participaters = await fetchAnalyseOverYearData('region');
      setParticipatingData(participaters);

      const events = await fetchAnalyseOverYearData('Event');
      setEventsData(events);

      const athletes = await fetchAnalyseOverYearData('Name');
      setAthletesData(athletes);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * (Platform.OS === 'web' ? 2 : 3);

  const transformData = (data, key) => {
    // Adjusted labels for better spacing
    const labels = data.Edition.map((edition, index) => index % 2 === 0 ? edition : '');

    return {
      labels: labels,
      datasets: [
        {
          data: data[key],
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: [key],
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Participating Nations over the years</Text>
      <ScrollView horizontal>
        <LineChart
          data={transformData(participatingData, 'region')}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </ScrollView>

      <Text style={styles.title}>Events over the years</Text>
      <ScrollView horizontal>
        <LineChart
          data={transformData(eventsData, 'Event')}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </ScrollView>

      <Text style={styles.title}>Athletes over the years</Text>
      <ScrollView horizontal>
        <LineChart
          data={transformData(athletesData, 'Name')}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </ScrollView>
    </ScrollView>
  );
};

export default SingleLineGraph;

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
