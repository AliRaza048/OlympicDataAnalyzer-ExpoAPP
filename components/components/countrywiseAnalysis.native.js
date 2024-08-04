import React, { useEffect, useState } from 'react';
import { fetchCountryWiseData } from '@/apis/common_apis/common_apis';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Dimensions, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DataTable } from 'react-native-paper';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const CountrywiseAnalysis = () => {
    const [countrywisedata, setCountryWiseData] = useState([]);
    const [heatmapData, setHeatmapData] = useState(null);
    const [allCountries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('USA');
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await fetchCountryWiseData(selectedCountry);
            setCountryWiseData(result.country_analyse);
            setCountries(result.countries);
            setHeatmapData(result.heatmap);
            setTableData(result.top10);
        } catch (error) {
            console.error("No data received from API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCountry]);

    const transformHeatmapData = (data) => {
        const years = Object.keys(data);
        const sports = Object.keys(data[years[0]]);
        const values = sports.map((_, index) => years.map(year => data[year][index]));

        return { years, sports, values };
    };

    const dataTransformData = (data) => {
        return {
            labels: data.Year,
            datasets: [{
                data: data.Medal.map(Number),
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                strokeWidth: 2
            }]
        };
    };

    const renderHeatmap = ({ years, sports, values }) => {
        const cellSize = 20;
        const maxVal = Math.max(...values.flat());

        const getColor = (value) => {
            const intensity = value / maxVal;
            const hue = (1 - intensity) * 240;
            return `hsl(${hue}, 100%, 50%)`;
        };

        return (
            <ScrollView horizontal>
                <View style={styles.heatmapContainer}>
                    <View style={styles.labelsContainer}>
                        {sports.map((sport, index) => (
                            <Text key={index} style={[styles.label, { height: cellSize }]}>{sport}</Text>
                        ))}
                    </View>
                    <Svg height={sports.length * cellSize} width={years.length * cellSize}>
                        {values.map((row, rowIndex) => 
                            row.map((value, colIndex) => (
                                <Rect
                                    key={`${rowIndex}-${colIndex}`}
                                    x={colIndex * cellSize}
                                    y={rowIndex * cellSize}
                                    width={cellSize}
                                    height={cellSize}
                                    fill={getColor(value)}
                                />
                            ))
                        )}
                        {years.map((year, index) => (
                            <SvgText
                                key={index}
                                x={index * cellSize + cellSize / 2}
                                y={sports.length * cellSize + 10}
                                fontSize="10"
                                fill="black"
                                textAnchor="middle"
                            >
                                {year}
                            </SvgText>
                        ))}
                    </Svg>
                    <View style={styles.colorScaleContainer}>
                        {Array.from({ length: 10 }, (_, index) => (
                            <View
                                key={index}
                                style={{
                                    width: cellSize,
                                    height: cellSize,
                                    backgroundColor: getColor((index / 10) * maxVal),
                                }}
                            />
                        ))}
                        <Text>0</Text>
                        <Text>{maxVal}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Picker
                selectedValue={selectedCountry}
                onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="USA" value="USA" />
                {allCountries.map(country => <Picker.Item key={country} label={country} value={country} />)}
            </Picker>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.title}>CountryWiseAnalysis</Text>
                    <ScrollView horizontal>
                        {countrywisedata && (
                            <LineChart
                                data={dataTransformData(countrywisedata)}
                                width={Platform.OS === 'web' ? screenWidth * 0.9 : screenWidth * 4}
                                height={220}
                                chartConfig={chartConfig}
                                style={styles.chart}
                            />
                        )}
                    </ScrollView>
                    <Text style={styles.title}>{selectedCountry} Excels in the Following Sports</Text>
                    {heatmapData && renderHeatmap(transformHeatmapData(heatmapData))}


                    <Text style={styles.title}>{selectedCountry} Top 10 Athletes</Text>
                    <ScrollView horizontal>
                        <View style={{ width: screenWidth * 2 }}>
                            <DataTable>
                                <DataTable.Header style={styles.tableHeader}>
                                    <DataTable.Title>Name</DataTable.Title>
                                    <DataTable.Title>Medal</DataTable.Title>
                                    <DataTable.Title>Sport</DataTable.Title>
                                </DataTable.Header>

                                {tableData?.Name?.map((row, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{tableData.Name[index]}</DataTable.Cell>
                                        <DataTable.Cell>{tableData.Medals[index]}</DataTable.Cell>
                                        <DataTable.Cell>{tableData.Sport[index]}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </View>
                    </ScrollView>
                </>
            )}
        </ScrollView>
    );
};

export default CountrywiseAnalysis;

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
    picker: {
        height: 40,
        marginVertical: 5,
        backgroundColor: '#e6e6fa',
        borderRadius: 5,
        width: Platform.OS === 'web' ? '50%' : '100%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    heatmapContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    labelsContainer: {
        justifyContent: 'center',
    },
    label: {
        textAlign: 'right',
        paddingRight: 5,
    },
    colorScaleContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
    },
    container: {
        padding: Platform.OS === 'web' ? '5%' : 15,
        backgroundColor: '#fff',
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        alignSelf: 'center',
    },
});
