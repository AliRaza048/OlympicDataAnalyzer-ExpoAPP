import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { fetchAthletsWiseAnalysisData, fetchFamousSportAnalysisData, fetchMenVsWomenData } from '@/apis/common_apis/common_apis';

const screenWidth = Dimensions.get('window').width;

const AthleteWiseAnalysis = () => {
  // const [data, setData] = useState({ x1: [], x2: [], x3: [], x4: [] });
  // const [data2, setData2] = useState({ x: [], name: [] });
  const [data3, setData3] = useState([]);

  const getData =  () => {
    try {
      // const response1 =  fetchAthletsWiseAnalysisData();
      // response1.then((result)=>{
      //   setData(response1);


      // })

      // const response2 = fetchFamousSportAnalysisData();
      // response2.then((result)=>{
      //   setData2(response2);

      // })

      const result =  fetchMenVsWomenData();
      result.then((result)=>{

        setData3(result);

      })
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const createBarData = (data) => ({
    labels: data.slice(0, 20).map((_, i) => (i % 2 === 0 ? `${i * 5}` : '')),
    datasets: [
      {
        data: data.slice(0, 20),
      },
    ],
  });

  const createLineData = (data) => ({
    labels: data.map(item => item.Year),
    datasets: [
      {
        data: data.map(item => item.Male),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: data.map(item => item.Female),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Male', 'Female'],
  });

  return (
    // <ScrollView>
    //   <View style={styles.container}>
    //     <Text style={styles.title}>Distribution of Age</Text>
    //     <ScrollView horizontal>
    //       <View>
    //         <BarChart
    //           data={createBarData(data.x1)}
    //           width={screenWidth * 2}
    //           height={300}
    //           yAxisLabel=""
    //           chartConfig={chartConfig}
    //           style={styles.chart}
    //         />
    //         <BarChart
    //           data={createBarData(data.x2)}
    //           width={screenWidth * 2}
    //           height={300}
    //           yAxisLabel=""
    //           chartConfig={chartConfig}
    //           style={styles.chart}
    //         />
    //         <BarChart
    //           data={createBarData(data.x3)}
    //           width={screenWidth * 2}
    //           height={300}
    //           yAxisLabel=""
    //           chartConfig={chartConfig}
    //           style={styles.chart}
    //         />
    //         <BarChart
    //           data={createBarData(data.x4)}
    //           width={screenWidth * 2}
    //           height={300}
    //           yAxisLabel=""
    //           chartConfig={chartConfig}
    //           style={styles.chart}
    //         />
    //       </View>
    //     </ScrollView>
    //     <Text style={styles.title}>Distribution of Age wrt Sports (Gold Medalist)</Text>

    <View>

        <ScrollView horizontal>
          <View>
            {data2.name.map((sport, index) => (
              <BarChart
                key={index}
                data={createBarData(data2.x[index])}
                width={screenWidth * 2}
                height={300}
                yAxisLabel=""
                chartConfig={chartConfig}
                style={styles.chart}
              />
            ))}
          </View>
        </ScrollView>
    <ScrollView>
      <View>
        <Text style={styles.title}>Men vs. Women Participation Over the Years</Text>
        <LineChart
          data={createLineData(data3)}
          width={screenWidth * 2}
          height={300}
          yAxisLabel=""
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

    </ScrollView>
    </View>
  );
};

export default AthleteWiseAnalysis;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 10,
  },
});
