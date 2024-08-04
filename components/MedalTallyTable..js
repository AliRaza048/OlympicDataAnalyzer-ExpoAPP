import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { fetchFilterOptions, fetchMedallTallyData } from '@/apis/common_apis/common_apis';


const MedalTallyTable = () => {
  
  const [selectedYear, setSelectedYear] = useState('Overall');
  const [selectedCountry, setSelectedCountry] = useState('Overall');
  const [tableData, setTableData] = useState([]);


  
  
  const [years, setYears] = useState([]);
  const [countries, setCountries] = useState([]);


  function fetchData(){
    console.log("DATA FETCHING.......................");
var data =  fetchFilterOptions()

data.then((data)=>{
  console.log(data);

  setCountries(data.countries);
  setYears(data.years);


  }).catch((error)=>{

console.log(`ERROR ${error}`);
  })
  ;

var dataMedall = fetchMedallTallyData(selectedYear,selectedCountry);
dataMedall.then((dataMedall)=>{
  console.log(dataMedall);


  const transformedData = dataMedall.region.map((region, index) => ({
    region,
    Gold: dataMedall.Gold[index],
    Silver: dataMedall.Silver[index],
    Bronze: dataMedall.Bronze[index],
    total: dataMedall.total[index]
  }));

  
  setTableData(transformedData);
  console.log(tableData);

})





  }
  useEffect(() => {
    fetchData();
    console.log
  }, [selectedYear, selectedCountry]);

  const tableHead = selectedYear === 'Overall' && selectedCountry !== 'Overall' 
  ? ['#', 'Year', 'Gold', 'Silver', 'Bronze', 'Total']
  : ['#', 'Region', 'Gold', 'Silver', 'Bronze', 'Total'];


  return (
    <View style={styles.container}>
      <View style={[topViewStyle.webfixedcontainer]}>

        <Text style={styles.heading}>Select Year</Text>
        <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)} style={[topViewStyle.pickersize]}>
        {years.map(year => <Picker.Item key={year} label={year} value={year} />)}
        </Picker>

        <Text style={styles.heading}>Select Country</Text>
        <Picker
        selectedValue={selectedCountry}
        onValueChange={(itemValue) => setSelectedCountry(itemValue)} style={[topViewStyle.pickersize]}>
        {countries.map(country => <Picker.Item key={country} label={country} value={country} />)}
        </Picker>

        {/* <Text style={styles.title}>Medal Tally</Text> */}
        <View style={[styles.row, topViewStyle.headerrow]}>
          {tableHead.map((header, index) => (
            <Text key={index} style={[styles.cell, styles.header, styles[`column${index}`]]}>{header}</Text>
          ))}
        </View>

      </View>

      <ScrollView style={[topViewStyle.scrollvieww]}>
        {/* empty data */}
        {tableData.length > 0 ? (
          // empty data
          tableData.map((row, index) => (
            // {tableData.map((row, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, topViewStyle.column0]}>{index + 1}</Text>
              <Text style={[styles.cell, styles.column1, topViewStyle.column1]}>{selectedYear === 'Overall' && selectedCountry !== 'Overall' ? row.Year : row.region}</Text>
              <Text style={[styles.cell, styles.column2, topViewStyle.column2]}>{row.Gold}</Text>
              <Text style={[styles.cell, styles.column3, topViewStyle.column3]}>{row.Silver}</Text>
              <Text style={[styles.cell, styles.column4, topViewStyle.column4]}>{row.Bronze}</Text>
              <Text style={[styles.cell, styles.column5, topViewStyle.column5]}>{row.total}</Text>
              </View>
          ))
          // ))}
         // empty data
        ) : (
          <Text style={styles.noDataText}>empty</Text>
        )}
         {/* empty data */}
      </ScrollView>

    </View>
  );
};

const topViewStyle = Platform.OS === 'web' ? {
  webfixedcontainer:{
    position: 'fixed',
    top: 0,
    width: '73.5%',
    backgroundColor: 'white',
    zIndex: 1,
    borderBottom: '0.5px solid #BEBEBE',
    borderRadius: 15,
    // borderShadow:'5px 1px 10px 0px #BEBEBE'
    // boxShadow: '5px 1px 10px 0px #BEBEBE',
  },
  scrollvieww: {
    marginTop: 170,
    marginHorizontal: 30,
    marginLeft:0
  },
  headerrow:{
    padding: 20,
  },
  column0: {
    width: 55, 
    // backgroundColor:"red",
    textAlign:'center'
  },
  column1: {
    width: 120,
    // backgroundColor:"red",
    // textAlign:'center',
    marginRight: 17,
    // textAlign:'center',
  },
  column2: {
    width: 80,
    // backgroundColor:"red",
    textAlign:'center',
  },
  column3: {
    width: 80,
    // backgroundColor:"red",
    textAlign:'center'
  },
  column4: {
    width: 80,
    // backgroundColor:"red",
    textAlign:'center'
  },
  column5: {
    width: 80,
    // backgroundColor:"red",
    textAlign:'center'
  },
  pickersize:{
    height: 35,
    borderRadius: 5,
    fontSize:18,
    borderColor:'#BEBEBE'
  },
} : {};


// const topViewStyle = Platform.select({
//   web: {
//   test:{position: 'fixed',
//   top: 0,
//   width: '100%',
//   backgroundColor: 'white',
//   zIndex: 1
//   }},
//   android:{

//   },
//   default: {}
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // backgroundColor:'#f5f5f5'
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    marginLeft:8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
//   contentContainer: {
//     paddingBottom: 20,
//   },
  // title: {
  //   fontSize: 30,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginBottom: 20,
  //   color: 'black',
  // },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  header: {
    fontWeight: 'bold',
    fontWeight: '900'
  },
  cell: {
    marginHorizontal: 5,
    // backgroundColor: 'red'
  },
  column0: {
    width: 10, 
    // backgroundColor: 'red'
    textAlign:'center',
  },
  column1: {
    width: 120,
    marginLeft: 40,
    // textAlign:'center',
  },
  column2: {
    width: 50,
    textAlign:'center',
  },
  column3: {
    width: 60,
    textAlign:'center',
  },
  column4: {
    width: 70,
    textAlign:'center',
  },
  column5: {
    width: 36,
    textAlign:'center',
    
  },
  noDataText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default MedalTallyTable;



















/////////////////1
/////without stick header
// import React from 'react';
// import { ScrollView, View, Text, StyleSheet } from 'react-native';
// import jsonData from './dataset.json';

// const removeDuplicatesAndAggregate = (data) => {
//   let uniqueData = new Map();
//   let tally = {};

//   // Remove duplicates
//   data.forEach(item => {
//     const key = `${item.Team}-${item.NOC}-${item.Games}-${item.Year}-${item.City}-${item.Sport}-${item.Event}-${item.Medal}`;
//     if (!uniqueData.has(key)) {
//       uniqueData.set(key, item);

//       if (!tally[item.region]) {
//         tally[item.region] = { Gold: 0, Silver: 0, Bronze: 0 };
//       }
      
//       // Summing values (assuming Gold, Silver, and Bronze are numeric)
//       tally[item.region].Gold += item.Gold;
//       tally[item.region].Silver += item.Silver;
//       tally[item.region].Bronze += item.Bronze;
//     }
//   });

//   // Convert tally object to an array, calculate total medals, and sort by Gold medals
//   return Object.entries(tally).map(([region, medals]) => ({
//     region, 
//     ...medals,
//     Total: medals.Gold + medals.Silver + medals.Bronze // Calculate total medals
//   })).sort((a, b) => b.Gold - a.Gold);
// };

// const MedalTallyTable = () => {
//   const tableData = removeDuplicatesAndAggregate(jsonData);
//   const tableHead = ['#', 'Region', 'Gold', 'Silver', 'Bronze', 'Total'];

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
//         <Text style={styles.title}>Medal Tally</Text>
//       <View style={styles.row}>
//         {tableHead.map((header, index) => (
//           <Text key={index} style={[styles.cell, styles.header, styles[`column${index}`]]}>{header}</Text>
//         ))}
//       </View>
//       {tableData.map((row, index) => (
//         <View key={index} style={styles.row}>
//           <Text style={[styles.cell, styles.column0]}>{index + 1}</Text>
//           <Text style={[styles.cell, styles.column1]}>{row.region}</Text>
//           <Text style={[styles.cell, styles.column2]}>{row.Gold}</Text>
//           <Text style={[styles.cell, styles.column3]}>{row.Silver}</Text>
//           <Text style={[styles.cell, styles.column4]}>{row.Bronze}</Text>
//           <Text style={[styles.cell, styles.column5]}>{row.Total}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//   },
// //   contentContainer: {
// //     paddingBottom: 20,
// //   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: 'black',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd'
//   },
//   header: {
//     fontWeight: 'bold',
//     fontWeight: '900'
//   },
//   cell: {
//     marginHorizontal: 5,
//   },
//   column0: {
//     width: 40, 
//   },
//   column1: {
//     width: 138,
//   },
//   column2: {
//     width: 50,
//   },
//   column3: {
//     width: 60,
//   },
//   column4: {
//     width: 70,
//   },
//   column5: {
//     width: 36,
//   }
// });
// export default MedalTallyTable;






/////with stick header
// import React from 'react';
// import { ScrollView, View, Text, StyleSheet } from 'react-native';
// import jsonData from './dataset.json';

// const removeDuplicatesAndAggregate = (data) => {
//   let uniqueData = new Map();
//   let tally = {};

//   // Remove duplicates
//   data.forEach(item => {
//     const key = `${item.Team}-${item.NOC}-${item.Games}-${item.Year}-${item.City}-${item.Sport}-${item.Event}-${item.Medal}`;
//     if (!uniqueData.has(key)) {
//       uniqueData.set(key, item);

//       if (!tally[item.region]) {
//         tally[item.region] = { Gold: 0, Silver: 0, Bronze: 0 };
//       }
      
//       // Summing values (assuming Gold, Silver, and Bronze are numeric)
//       tally[item.region].Gold += item.Gold;
//       tally[item.region].Silver += item.Silver;
//       tally[item.region].Bronze += item.Bronze;
//     }
//   });

//   // Convert tally object to an array, calculate total medals, and sort by Gold medals
//   return Object.entries(tally).map(([region, medals]) => ({
//     region, 
//     ...medals,
//     Total: medals.Gold + medals.Silver + medals.Bronze // Calculate total medals
//   })).sort((a, b) => b.Gold - a.Gold);
// };

// const MedalTallyTable = () => {
//   const tableData = removeDuplicatesAndAggregate(jsonData);
//   const tableHead = ['#', 'Region', 'Gold', 'Silver', 'Bronze', 'Total'];

//   return (
//     <View style={styles.container}>
//     <Text style={styles.title}>Medal Tally</Text>
//       <View style={styles.row}>
//         {tableHead.map((header, index) => (
//           <Text key={index} style={[styles.cell, styles.header, styles[`column${index}`]]}>{header}</Text>
//         ))}
//       </View>
//     <ScrollView >
//       {tableData.map((row, index) => (
//         <View key={index} style={styles.row}>
//           <Text style={[styles.cell, styles.column0]}>{index + 1}</Text>
//           <Text style={[styles.cell, styles.column1]}>{row.region}</Text>
//           <Text style={[styles.cell, styles.column2]}>{row.Gold}</Text>
//           <Text style={[styles.cell, styles.column3]}>{row.Silver}</Text>
//           <Text style={[styles.cell, styles.column4]}>{row.Bronze}</Text>
//           <Text style={[styles.cell, styles.column5]}>{row.Total}</Text>
//         </View>
//       ))}
//     </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//   },
// //   contentContainer: {
// //     paddingBottom: 20,
// //   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: 'black',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd'
//   },
//   header: {
//     fontWeight: 'bold',
//     fontWeight: '900'
//   },
//   cell: {
//     marginHorizontal: 5,
//   },
//   column0: {
//     width: 40, 
//   },
//   column1: {
//     width: 138,
//   },
//   column2: {
//     width: 50,
//   },
//   column3: {
//     width: 60,
//   },
//   column4: {
//     width: 70,
//   },
//   column5: {
//     width: 36,
//   }
// });
// export default MedalTallyTable;










///////////////////////2

/////without stick header
// import React from 'react';
// import { ScrollView, View, Text, StyleSheet } from 'react-native';
// import jsonData from './dataset.json';

// const calculateMedalTally = (data) => {
//   let tally = {};

//   data.forEach(item => {
//     if (!tally[item.region]) {
//       tally[item.region] = { Gold: 0, Silver: 0, Bronze: 0 };
//     }

//     tally[item.region].Gold += item.Gold;
//     tally[item.region].Silver += item.Silver;
//     tally[item.region].Bronze += item.Bronze;
//   });

//   for (let region in tally) {
//     tally[region].Total = tally[region].Gold + tally[region].Silver + tally[region].Bronze;
//   }

//   return Object.entries(tally).map(([region, medals]) => ({ region, ...medals }));
// };

// const MedalTallyTable = () => {
//   const tableData = calculateMedalTally(jsonData);
//   const tableHead = ['#', 'Region', 'Gold', 'Silver', 'Bronze', 'Total'];

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
//         <Text style={styles.title}>Medal Tally</Text>
//       <View style={styles.row}>
//         {tableHead.map((header, index) => (
//           <Text key={index} style={[styles.cell, styles.header, styles[`column${index}`]]}>{header}</Text>
//         ))}
//       </View>
//       {tableData.map((row, index) => (
//         <View key={index} style={styles.row}>
//           <Text style={[styles.cell, styles.column0]}>{index + 1}</Text>
//           <Text style={[styles.cell, styles.column1]}>{row.region}</Text>
//           <Text style={[styles.cell, styles.column2]}>{row.Gold}</Text>
//           <Text style={[styles.cell, styles.column3]}>{row.Silver}</Text>
//           <Text style={[styles.cell, styles.column4]}>{row.Bronze}</Text>
//           <Text style={[styles.cell, styles.column5]}>{row.Total}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//   },
// //   contentContainer: {
// //     paddingBottom: 20,
// //   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: 'black',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd'
//   },
//   header: {
//     fontWeight: 'bold',
//     fontWeight: '900'
//   },
//   cell: {
//     marginHorizontal: 5,
//   },
//   column0: {
//     width: 40, 
//   },
//   column1: {
//     width: 138,
//   },
//   column2: {
//     width: 50,
//   },
//   column3: {
//     width: 60,
//   },
//   column4: {
//     width: 70,
//   },
//   column5: {
//     width: 35,
//   }
// });

// export default MedalTallyTable;





/////with stick header
// import React from 'react';
// import { ScrollView, View, Text, StyleSheet } from 'react-native';
// import jsonData from './dataset.json';

// const calculateMedalTally = (data) => {
//   let tally = {};

//   data.forEach(item => {
//     if (!tally[item.region]) {
//       tally[item.region] = { Gold: 0, Silver: 0, Bronze: 0 };
//     }

//     tally[item.region].Gold += item.Gold;
//     tally[item.region].Silver += item.Silver;
//     tally[item.region].Bronze += item.Bronze;
//   });

//   for (let region in tally) {
//     tally[region].Total = tally[region].Gold + tally[region].Silver + tally[region].Bronze;
//   }

//   return Object.entries(tally).map(([region, medals]) => ({ region, ...medals }));
// };

// const MedalTallyTable = () => {
//   const tableData = calculateMedalTally(jsonData);
//   const tableHead = ['#', 'Region', 'Gold', 'Silver', 'Bronze', 'Total'];

//   return (
//     <View style={styles.container}>
//     <Text style={styles.title}>Medal Tally</Text>
//       <View style={styles.row}>
//         {tableHead.map((header, index) => (
//           <Text key={index} style={[styles.cell, styles.header, styles[`column${index}`]]}>{header}</Text>
//         ))}
//       </View>
//     <ScrollView >
//       {tableData.map((row, index) => (
//         <View key={index} style={styles.row}>
//           <Text style={[styles.cell, styles.column0]}>{index + 1}</Text>
//           <Text style={[styles.cell, styles.column1]}>{row.region}</Text>
//           <Text style={[styles.cell, styles.column2]}>{row.Gold}</Text>
//           <Text style={[styles.cell, styles.column3]}>{row.Silver}</Text>
//           <Text style={[styles.cell, styles.column4]}>{row.Bronze}</Text>
//           <Text style={[styles.cell, styles.column5]}>{row.Total}</Text>
//         </View>
//       ))}
//     </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//   },
// //   contentContainer: {
// //     paddingBottom: 20,
// //   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: 'black',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd'
//   },
//   header: {
//     fontWeight: 'bold',
//     fontWeight: '900'
//   },
//   cell: {
//     marginHorizontal: 5,
//   },
//   column0: {
//     width: 40, 
//   },
//   column1: {
//     width: 138,
//   },
//   column2: {
//     width: 50,
//   },
//   column3: {
//     width: 60,
//   },
//   column4: {
//     width: 70,
//   },
//   column5: {
//     width: 35,
//   }
// });
// export default MedalTallyTable;































// import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
// const MedalTallyTable = () => {

// const topViewStyle = Platform.select({
//   web: {
//   test:{position: 'fixed',
//   top: 0,
//   width: '100%',
//   backgroundColor: 'white',
//   zIndex: 1
//   }},
//   default: {}
// });
  // return (
    // <View style={styles.container}>
{/* <View style={[styles.heading, topViewStyle.test]}></View> */}
{/* <Text style={styles.heading}>Select Country</Text> */}
// </View>
// );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//     // marginBottom: 5,
//     marginLeft:8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd'
//   },
// });
// export default MedalTallyTable;



// import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
// const MedalTallyTable = () => {
// const topViewStyle = Platform.select({
//   web: {
//   test:{position: 'fixed',
//   top: 0,
//   width: '100%',
//   backgroundColor: 'white',
//   zIndex: 1
//   }},
//     mobile: {
//   test:{
//    width: '100%',
//   backgroundColor: 'white',
//   zIndex: 1
//   }},
//   default: {}
// });
  // return (
    // <View style={styles.container}>
{/* <View style={[styles.heading, topViewStyle.test]}></View> */}
{/* <Text style={styles.heading}>Select Country</Text> */}
// </View>
// );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//     // marginBottom: 5,
//     marginLeft:8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd'
//   },
// });
// export default MedalTallyTable;





// import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
// const MedalTallyTable = () => {
// const topViewStyle = Platform.select({
//   web: {
//   test:{position: 'fixed',
//   top: 0,
//   width: '100%',
//   backgroundColor: 'white',
//   zIndex: 1
//   }},
//     android: {
//   test:{
//    width: '100%',
//   backgroundColor: 'white',
//   zIndex: 1
//   }},
//   ios: {
//   test:{
//     //   backgroundColor: 'white',
//     //   }
// },
// default: {}
// });
  // return (
    // <View style={styles.container}>
{/* <View style={[styles.heading, topViewStyle.test]}></View> */}
{/* <Text style={styles.heading}>Select Country</Text> */}
// </View>
// );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//     // marginBottom: 5,
//     marginLeft:8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd'
//   },
// });
// export default MedalTallyTable;



// import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
// const topViewStyle = Platform.select({
//   web: {
//   test:{position: 'fixed',
//   top: 0,
//   width: '100%',
//   backgroundColor: 'white',
//   zIndex: 1
//   }},
//     android: {
//   test:{
//    width: '100%',
//   backgroundColor: 'white',
//   zIndex: 1
//   }},
//   ios: {
//   test:{
//     //   backgroundColor: 'white',
//     //   }
// },
// default: {}
// });

// const MedalTallyTable = () => {
  // return (
    // <View style={styles.container}>
{/* <View style={[styles.heading, topViewStyle.test]}></View> */}
{/* <Text style={styles.heading}>Select Country</Text> */}
// </View>
// );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//     // marginBottom: 5,
//     marginLeft:8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd'
//   },
// });
// export default MedalTallyTable;





// const topViewStyle = Platform.OS === 'web' ? [
//   {
//       position: 'fixed',
//       top: 0,
//       width: '100%',
//       backgroundColor: 'white',
//       zIndex: 1
//   },
//   // Add more web-specific styles here
// ] : [
//   {
//       paddingTop: 15, // Example mobile-specific style
//       // Add more mobile-specific styles here
//   },
//   // Add more mobile-specific styles here if needed
// ];

// // ...

// return (
//   <View style={styles.container}>
//       <View style={topViewStyle}>
//           {/* The rest of your top view content */}
//       </View>
//       <ScrollView>
//           {/* Your scrollable content */}
//       </ScrollView>
//   </View>
// );