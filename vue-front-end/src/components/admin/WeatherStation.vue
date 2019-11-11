<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">

    <!-- This data table is for specific weather data -->
    <!-- The top row will contain the current weather data -->
    <v-data-table
        v-if="!$store.state.isLoading"
        :headers="dbHeaders"
        :items="dbData"
        select-all
        class="elevation-1"
    >
        <template slot="headers" slot-scope="props">
            <tr>
            <th class="text-xs-center" v-for="header in props.headers" :key="header.text">
                <h2>{{ header.text }}</h2>
            </th>
            </tr>
        </template>
        <!--  -->
        <template slot="items" slot-scope="props">
            <tr
            @click="updateForm(props.item.name, props.item.id, props.item.declination, props.item.hours, props.item.minutes, props.item.seconds)"
            >
            <!-- <td class="text-xs-left">{{ props.item.id }}</td> -->
            <td class="text-xs-center">{{ props.item.timeStamp }}</td>
            <td class="text-xs-center">{{ props.item.windSpeed }}</td>
            <td class="text-xs-center">{{ props.item.windDirection }}</td>
            <td class="text-xs-center">{{ props.item.tempF }}</td>
            <td class="text-xs-center">{{ props.item.rainRate }}</td>
            <td class="text-xs-center">{{ props.item.rainTotal }}</td>
            <td class="text-xs-center">{{ props.item.rainDay }}</td>
            <td class="text-xs-center">{{ props.item.pressure }}</td>
            <td class="text-xs-center">{{ props.item.dewPoint }}</td>
            <td class="text-xs-center">{{ props.item.windChill }}</td>
            <td class="text-xs-center">{{ props.item.heatIndex }}</td>

            </tr>
        </template>
    </v-data-table>

    <v-layout justify-center>
        <v-flex xs12 sm2>
            <v-select
                v-model="selectedDataSet"
                :items="dataSetList"
                label="Data Set"
            >
            </v-select>
        </v-flex>
        <v-flex xs12 sm1></v-flex>
        <v-flex xs12 sm2>
            <v-select
                v-model="selectedTimeScale"
                :items="timeScaleList"
                label="Time Scale"
            >
            </v-select>
        </v-flex>
    </v-layout>

    <div> 
        <v-btn color="primary darken-1" @click="populateData()">Load Data Graph</v-btn>
    </div>
    
    <v-dialog hide-overlay transition="dialog-bottom-transition" v-model="graphToggle">
            <v-btn color="primary darken-1" slot="activator">View Data Graph</v-btn>
            <div class="graph-style">
                <weather-data-graph v-model="graphData" :styles="graphStyles"></weather-data-graph>
            </div>
        </v-dialog>
          
    </v-card>
</div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading"
import WeatherDataGraph from '../../components/visualization/WeatherGraph';
import moment from 'moment';
import Chart from 'chart.js';

export default {
    name: 'WeatherStation',
    data(){
        return {
            dataSetList: [              // Items in Data Set dropdown menu
                'Wind Speed',
                'Temperature',
                'Rain Rate',
                'Rain Total',
                'Rain for Day',
                'Barometric Pressure',
                'Dew Point',
                'Wind Chill',
                'Heat Index'
            ],
            timeScaleList: [            // Items in Time Scale dropdown menu
                'Past Day',
                'Past Week',
                'Past Month',
                'Past 6 Months',
                'Past Year',
                'Past 5 Years'
            ],
            selectedDataSet: '',        // Dataset that is currtly selected from dropdown menu
            dataSetVar: null,           // Variable used to load different data elements depending on dataset
            selectedTimeScale: '',      // Time range that is currently selected from dropdown menu
            graphToggle: false,         // Boolean set whether to show the graph or not (toggled by button)
            graphData: {                // The data structure that holds data to be graphed
                labels: [],             // Strings displayed along x-axis for each data point
                datasets: []            // data for each x/y coordinate and individual label
            },
            // The following data sets is hardcoded dummy data
            dbHeaders: [
                { text: 'Time Stamp', align: 'left', sortable: false, value: 'timeStamp'},
                { text: 'Wind Speed', sortable: false, value: 'windSpeed' },
                { text: 'Wind Direction', sortable: false, value: 'windDirection' },
                { text: 'Temperature (°F)', sortable: false, value: 'tempF' },
                { text: 'Rain Rate', sortable: false, value: 'rainRate' },
                { text: 'Total Rain', sortable: false, value: 'rainTotal' },
                { text: 'Rain for Day', sortable: false, value: 'rainDay' },
                { text: 'Barometric Pressure', sortable: false, value: 'pressure' },
                { text: 'Dew Point', sortable: false, value: 'dewPoint' },
                { text: 'Wind Chill', sortable: false, value: 'windChill' },
                { text: 'Heat Index', sortable: false, value: 'heatIndex' }
            ],
            dbData: [
                {   id: 1, timeStamp: "2019-11-11 13:00:00", windSpeed: "13", windDirection: "NW", tempF: "76", 
                    rainRate: "2.0", rainTotal: "2.0", rainDay: "3.0", pressure: "1.0" ,
                    dewPoint: "72", windChill: "68", heatIndex: "91"},
                {   id: 2, timeStamp: "2019-11-10 10:30:00", windSpeed: "16", windDirection: "NE", tempF: "78", 
                    rainRate: "0.5", rainTotal: "0.9", rainDay: "1.1", pressure: "1.0" ,
                    dewPoint: "61", windChill: "64", heatIndex: "97"},
                {   id: 3, timeStamp: "2019-11-01 17:00:00", windSpeed: "11", windDirection: "S", tempF: "81", 
                    rainRate: "1.2", rainTotal: "1.5", rainDay: "2.0", pressure: "1.0" ,
                    dewPoint: "59", windChill: "66", heatIndex: "101"},
                {   id: 4, timeStamp: "2019-10-10 10:31:00", windSpeed: "24", windDirection: "E", tempF: "75", 
                    rainRate: "2.9", rainTotal: "3.0", rainDay: "2.0", pressure: "1.0" ,
                    dewPoint: "62", windChill: "44", heatIndex: "98"},
                {   id: 1, timeStamp: "2019-10-11 13:00:00", windSpeed: "13", windDirection: "NW", tempF: "76", 
                    rainRate: "2.0", rainTotal: "2.0", rainDay: "3.0", pressure: "1.0" ,
                    dewPoint: "72", windChill: "68", heatIndex: "91"},
                {   id: 2, timeStamp: "2019-10-10 10:30:00", windSpeed: "16", windDirection: "NE", tempF: "78", 
                    rainRate: "0.5", rainTotal: "0.9", rainDay: "1.1", pressure: "1.0" ,
                    dewPoint: "61", windChill: "64", heatIndex: "97"},
                {   id: 3, timeStamp: "2019-10-01 17:00:00", windSpeed: "11", windDirection: "S", tempF: "81", 
                    rainRate: "1.2", rainTotal: "1.5", rainDay: "2.0", pressure: "1.0" ,
                    dewPoint: "59", windChill: "66", heatIndex: "101"},
                {   id: 4, timeStamp: "2019-09-10 10:31:00", windSpeed: "24", windDirection: "E", tempF: "75", 
                    rainRate: "2.9", rainTotal: "3.0", rainDay: "2.0", pressure: "1.0" ,
                    dewPoint: "62", windChill: "44", heatIndex: "98"},
                {   id: 1, timeStamp: "2019-09-09 13:00:00", windSpeed: "13", windDirection: "NW", tempF: "76", 
                    rainRate: "2.0", rainTotal: "2.0", rainDay: "3.0", pressure: "1.0" ,
                    dewPoint: "72", windChill: "68", heatIndex: "91"},
                {   id: 2, timeStamp: "2019-09-08 10:30:00", windSpeed: "16", windDirection: "NE", tempF: "78", 
                    rainRate: "0.5", rainTotal: "0.9", rainDay: "1.1", pressure: "1.0" ,
                    dewPoint: "61", windChill: "64", heatIndex: "97"},
                {   id: 3, timeStamp: "2019-09-01 17:00:00", windSpeed: "11", windDirection: "S", tempF: "81", 
                    rainRate: "1.2", rainTotal: "1.5", rainDay: "2.0", pressure: "1.0" ,
                    dewPoint: "59", windChill: "66", heatIndex: "101"},
                {   id: 4, timeStamp: "2019-08-10 10:31:00", windSpeed: "24", windDirection: "E", tempF: "75", 
                    rainRate: "2.9", rainTotal: "3.0", rainDay: "2.0", pressure: "1.0" ,
                    dewPoint: "62", windChill: "44", heatIndex: "98"}
            ],
            WSData: [],     // Data array used for download to CSV
            dataIndex: 0,   // index used for multiple datasets on single graph

        }
    },
    methods:{
        populateData() {            // Loads dataset onto graph
            this.clearGraph();      // clear any loaded data
            var data = this.dbData; // obtain raw data here

            // Populate the RF Data array
            for (var index in data) {
                let wsData = data[index];                                                           // Get instance of data point
                // console.log("Time Stamp: " + wsData.timeStamp.toString());                                                      
                wsData.timeCaptured = moment(wsData.timeStamp).format();                            // The date/time object to be used for comparison
                wsData.timeDisplay = moment(wsData.timeStamp).format('MM/DD/YYYY hh:mm:ss A');      // The human readable date/time to be visually displayed
                // console.log("Formatted Time Stamp: " + wsData.timeCaptured.toString());
                // console.log(moment(wsData.timeCaptured).date());
                // console.log("Is Valid: " + this.isValidTimeStamp(wsData.timeCaptured));
                if (this.isValidTimeStamp(wsData.timeCaptured)){                                    // Only execute this code block for valid time stamps
                    var dataPointVal = this.getDataPoint(wsData);                                   // method must use 'this.' keyword
                    this.WSData.push(wsData);                                                       // This is the dataset is gets downloaded (might need later)
                    this.graphData.labels.push(wsData.timeDisplay);                                // Push timestamp label into array
                    if(this.graphData.datasets.length <= this.dataIndex){                           // If datasets array is empty, create one dataset 
                        this.graphData.datasets.push({label: 'ID #: ' + wsData.id, 
                                                    backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16), 
                                                    fill: false, 
                                                    data: []});                                   // This is the array that will hold the coordinates
                    }
                    this.graphData.datasets[this.dataIndex].data.push({y: dataPointVal, x: wsData.timeDisplay});   // Push coordinates onto data array
                    this.graphData.datasets[this.dataIndex].label = this.selectedDataSet;                           // Label the dataset with element name
                }
            }
            this.dataIndex +=1; // increment dataIndex (used only for multiple datasets on single graph)
        },
        getDataPoint(data) {
            var selected = this.selectedDataSet;
            // console.log("Selected Data Set: " + selected); // local variable 'selected' should not use 'this.' keyword.
            switch(selected)
            {
                case "Wind Speed":
                    return data.windSpeed;
                case "Temperature":
                    return data.tempF;
                case "Rain Rate":
                    return data.rainRate;
                case "Rain Total":
                    return data.rainTotal;
                case "Rain for Day":
                    return data.rainDay;
                case "Barometric Pressure":
                    return data.pressure;
                case "Dew Point":
                    return data.dewPoint;
                case "Wind Chill":
                    return data.windChill;
                case "Heat Index":
                    return data.heatIndex;
                default:
                    return data.tempF;
            }
        },
        getDayCount(){
            var selected = this.selectedTimeScale;
            // console.log("Selected Time Scale: " + selected);
            switch(selected){
                case "Past Day":
                    return 1;
                case "Past Week":
                    return 7;
                case "Past Month":
                    return 30;
                case "Past 6 Months":
                    return 180;
                case "Past Year":
                    return 365;
                case "Past 5 Years":
                    return 1825;
                default:
                    return 1;
            }
        },
        isValidTimeStamp(timeStampVal){
            var targetDate = moment(timeStampVal).format('MM/DD/YYYY hh:mm:ss A');
            var currentDate = moment();
            var numDays = this.getDayCount();
            var boundaryDate = moment().subtract(numDays, 'days');
            // console.log("target Date: " + targetDate.toString());
            if (moment(targetDate).isBetween(boundaryDate, currentDate, null, [])){
                return true;
            }
            else{
                return false;
            }
        },
        clearGraph() {  // Removes all datasets and labels currently loaded to the graph
            console.log("Clearing graph data...");
            while (this.graphData.datasets.length > 0){
                this.graphData.datasets.pop();
            }
            while (this.graphData.labels.length > 0){
                this.graphData.labels.pop();
            }
            this.dataIndex = 0;
            console.log("After Clearing... # of data points: " + this.graphData.datasets.length);   // Should be zero
            console.log("After Clearing... # of labels: " + this.graphData.labels.length);          // Should be zero
        }
    },
    mounted: function(){
        this.selectedDataSet = 'Temperature';       // 'Temperature' is default
        this.selectedTimeScale = 'Past Week';       // 'Past Week' is default
        this.populateData();                        // Populating without any valid data points results in dead graph
    },
    components: {
        Loading,
        WeatherDataGraph
    },
    computed: {
        graphStyles() {
            return {
                height: '600px',
                position: 'relative',
                backgroundColor: '#ffffff',
                responsive: true,                           // options have been moved here to set the y-axis label
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time Stamp',
                            fontColor: '#111111'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            // labelString: this.selectedDataSet,  // This only renders on mounted with valid data points
                            fontColor: '#111111'
                        }
                    }]
                }
            }
        }
    }
};

</script>
<style scoped>
    
</style>