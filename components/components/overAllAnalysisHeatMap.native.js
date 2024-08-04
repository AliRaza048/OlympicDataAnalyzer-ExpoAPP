import { fetchOverallAnalysisHeatmapData } from '@/apis/common_apis/common_apis';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

const OverallAnalysisHeatMap = () => {
    const [heatmapData, setHeatmapData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await fetchOverallAnalysisHeatmapData();
            setHeatmapData(result.heatmap);
        } catch (error) {
            console.error("No data received from API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const transformHeatmapData = (data) => {
        const years = Object.keys(data);
        const sports = Object.keys(data[years[0]]);
        const values = sports.map((sport) => years.map((year) => data[year][sport] || 0));
        return { years, sports, values };
    };

    const screenWidth = Dimensions.get('window').width;

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
                <ScrollView verticle>
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
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.title}>No. of Events over time (Every Sport)</Text>
                    {heatmapData && renderHeatmap(transformHeatmapData(heatmapData))}
                </>
            )}
        </View>
    );
};

export default OverallAnalysisHeatMap;

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
        marginVertical: 2,
    },
    heatmapContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelsContainer: {
        justifyContent: 'center',
    },
    label: {
        textAlign: 'right',
        paddingRight: 2,
    },
    colorScaleContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 2,
    },
});
