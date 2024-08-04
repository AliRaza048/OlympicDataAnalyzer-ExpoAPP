import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { fetchAthletsWiseAnalysisData, fetchFamousSportAnalysisData, fetchHeightVsWeighData, fetchMenVsWomenData } from '@/apis/common_apis/common_apis';

const screenWidth = Dimensions.get('window').width;

const AthleteWiseAnalysis = () => {
  const [data, setData] = useState({ x1: [], x2: [], x3: [], x4: [] });
  const [data2, setData2] = useState({ x: [], name: [] });
  const [data3, setData3] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response2 = await fetchFamousSportAnalysisData();
      setData2(response2);

      const response3 = await fetchMenVsWomenData();
      setData3(response3);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const dataItem = {
    labels: data2.x[0],
    datasets: [
      {
        data: data2.x[0],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: [data2.name[0]]
  };

  return (
    <ScrollView>
      <View style={{marginTop:30}}>

        <Text>Distribution of Age wrt Sports (Gold Medalist)</Text>

        <ScrollView horizontal>

       
        <BarChart
          data={dataItem}
          width={screenWidth*8}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
         </ScrollView>
      </View>
      

      <View>
        <Text>Men vs. Women Participation Over the Years</Text>
        <ScrollView horizontal>

        <LineChart
          data={{
            labels: data3.map(item => item.Year),
            datasets: [
              {
                data: data3.map(item => item.Male),
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
                strokeWidth: 2 // optional
              },
              {
                data: data3.map(item => item.Female),
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
            legend: ['Male', 'Female']
          }}
          width={screenWidth*3}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
                 </ScrollView>

      </View>
      
    </ScrollView>
  );
};

export default AthleteWiseAnalysis;
