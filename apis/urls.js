import { Platform } from "react-native";
var  serverUrl;
Platform.OS=='web'?serverUrl = "http://localhost:8000":serverUrl = "https://e38b-111-68-98-163.ngrok-free.app";


export var uniqueCountryYearSportUrl =`${serverUrl}/unique_years_countries_sports/`;
export var medalTallyUrl =`${serverUrl}/medaltally/`;
export var analysisOverYearUrl = `${serverUrl}/analyse_year/`;
export var heatMapNoEventsUrl =`${serverUrl}/heatmap_noevents/`;
export var successfulAthletsUrl  = `${serverUrl}/successful_athlets/`;
export var countrywiseAnalysisUrl =`${serverUrl}/countrywise_analysis/`; 
export var athletswiseAnalysisUrl =`${serverUrl}/athletswise_analysis/`;
export var famousSportUrl = `${serverUrl}/famous_sport/`;
export var heightWeightUrl = `${serverUrl}/heightWeight/`;
export var menWomenUrl = `${serverUrl}/men_women/`;



// AUTH APIS 

export var registerUrl = `${serverUrl}/accountsregister/`;

export var loginUrl = `${serverUrl}/accountslogin/`;




