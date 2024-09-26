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
            <td class="text-xs-center">{{ props.item.insertTimestamp }}</td>
            <td class="text-xs-center">{{ props.item.windSpeed }}</td>
            <td class="text-xs-center">{{ props.item.windDirectionDeg }}</td>
            <td class="text-xs-center">{{ props.item.windDirectionStr }}</td>
            <td class="text-xs-center">{{ props.item.outsideTemperatureDegF }}</td>
            <td class="text-xs-center">{{ props.item.insideTemperatureDegF }}</td>
            <td class="text-xs-center">{{ props.item.rainRate }}</td>
            <td class="text-xs-center">{{ props.item.rainTotal }}</td>
            <td class="text-xs-center">{{ props.item.rainDay }}</td>
            <td class="text-xs-center">{{ props.item.rainMonth }}</td>
            <td class="text-xs-center">{{ props.item.barometricPressure }}</td>
            <td class="text-xs-center">{{ props.item.dewPoint }}</td>
            <td class="text-xs-center">{{ props.item.windChill }}</td>
            <td class="text-xs-center">{{ props.item.humidity }}</td>
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
        <v-btn color="primary darken-1" @click="retrieveData()">Load Data Graph</v-btn>
    </div>
    
    <v-dialog hide-overlay transition="dialog-bottom-transition" v-model="graphToggle">
        <v-btn color="primary darken-1" slot="activator">View Data Graph</v-btn>
        <line-chart :chart-data="graphData" :styles="graphStyles"></line-chart>
    </v-dialog>
          
    </v-card>
</div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading";
import moment from 'moment';
import Chart from 'chart.js';
import LineChart from '../../components/visualization/WeatherGraph.js';

export default {
    name: 'WeatherStation',
    data(){
        return {
            dataSetList: [              // Items in Data Set dropdown menu
                'Wind Speed',
                'Outside Temperature (°F)',
                'Inside Temperature (°F)',
                'Rain Rate',
                'Rain Total',
                'Rain for Day',
                'Rain for Month',
                'Barometric Pressure',
                'Dew Point',
                'Wind Chill',
                'Humidity',
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
            selectedTimeScale: '',      // Time range that is currently selected from dropdown menu
            graphToggle: false,         // Boolean set whether to show the graph or not (toggled by button)
            graphData: {                // The data structure that holds data to be graphed
                labels: [],             // Strings displayed along x-axis for each data point
                datasets: []            // data for each x/y coordinate and individual label
            },
            dbHeaders: [
                { text: 'Time Stamp', align: 'left', sortable: false, value: 'timeStamp'},
                { text: 'Wind Speed', sortable: false, value: 'windSpeed' },
                { text: 'Wind Direction (°)', sortable: false, value: 'windDirection' },
                { text: 'Wind Direction', sortable: false, value: 'windDirectionStr' },
                { text: 'Outside Temperature (°F)', sortable: false, value: 'outTempF' },
                { text: 'Inside Temperature (°F)', sortable: false, value: 'inTempF' },
                { text: 'Rain Rate', sortable: false, value: 'rainRate' },
                { text: 'Total Rain', sortable: false, value: 'rainTotal' },
                { text: 'Rain for Day', sortable: false, value: 'rainDay' },
                { text: 'Rain for Month', sortable: false, value: 'rainMonth' },
                { text: 'Barometric Pressure', sortable: false, value: 'pressure' },
                { text: 'Dew Point', sortable: false, value: 'dewPoint' },
                { text: 'Wind Chill', sortable: false, value: 'windChill' },
                { text: 'Humidity', sortable: false, value: 'humidity' },
                { text: 'Heat Index', sortable: false, value: 'heatIndex' }
            ],
            dbData: [],
            WSData: [],     // Data array used for download to CSV
            dataIndex: 0,   // index used for multiple datasets on single graph

        }
    },
    methods:{
        retrieveData() {
            // Set the store's loading boolean to true
            this.$store.commit("loading", true);

            var upperDate = new Date(Date.now()).toUTCString();     // Set current date to get newest video files.
            var lowerDate = this.getLowerBoundaryDate(upperDate);
            // console.log("LowerDate: " + lowerDate + ", UpperDate: " + upperDate);        //Logging for Debug purposes

            // Make the API call
            ApiDriver.WeatherData.listWeatherDataBetweenDates(lowerDate, upperDate).then((response) => {
                // Handle the server response
                HttpResponse.then(response, (data) => {
                    // Populate the data and set the store's boolean back to false
                    // console.log("Returned Data: " + data.data);                          //Logging for Debug purposes
                    this.populateData(data.data);
                    this.$store.commit("loading", false)
                }, (status, errors) => {
                    // Access Denied
                    if (parseInt(status) === 403) {
                        // Call the generic access denied handler
                        HttpResponse.accessDenied(this);
                    } 
                    // Not Found
                    else if (parseInt(status) === 404) {
                        // Call the generic invalid resource id handler
                        HttpResponse.notFound(this, errors);
                    }
                })
            })
        },
        populateData(dbData) {            // Loads dataset onto graph
            this.clearGraph();      // clear any loaded data
            dbData.reverse();
            for (var index in dbData) {
                let wsData = dbData[index];                                                           // Get instance of data point
                // console.log("data: " + JSON.stringify(dbData[index]));                             //Logging for Debug purposes
                wsData.insertTimestamp = moment(wsData.insertTimestamp).format('MM/DD/YYYY hh:mm:ss A');

                this.dbData.push(wsData);                                                           // Push data onto table
                var dataPointVal = this.getDataPoint(wsData);                                   // method must use 'this.' keyword
                this.WSData.push(wsData);                                                       // This is the dataset is gets downloaded (might need later)
                this.graphData.labels.push(wsData.insertTimestamp);                                // Push timestamp label into array
                if(this.graphData.datasets.length <= this.dataIndex){                           // If datasets array is empty, create one dataset 
                    this.graphData.datasets.push({label: 'ID #: ' + wsData.id, 
                                                backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16), 
                                                fill: false, 
                                                data: []});                                   // This is the array that will hold the coordinates
                }
                this.graphData.datasets[this.dataIndex].data.push({y: dataPointVal, x: wsData.timeDisplay});   // Push coordinates onto data array
                this.graphData.datasets[this.dataIndex].label = this.selectedDataSet;                           // Label the dataset with element name
            }
            this.graphData.datasets[this.dataIndex].data.reverse();     // Reverse the order of the datapoints to that they have Left-to-Right time direction
            this.graphData.labels.reverse();                            // Reverse the order of the labels to match the datapoints on the graph
            this.dataIndex +=1; // increment dataIndex (used only for multiple datasets on single graph)
        },
        getDataPoint(data) {
            var selected = this.selectedDataSet;
            // console.log("Selected Data Set: " + selected); // local variable 'selected' should not use 'this.' keyword.
            switch(selected)
            {
                case "Wind Speed":
                    return data.windSpeed;
                case "Outside Temperature (°F)":
                    return data.outsideTemperatureDegF;
                case "Inside Temperature (°F)":
                    return data.insideTemperatureDegF;
                case "Rain Rate":
                    return data.rainRate;
                case "Rain Total":
                    return data.rainTotal;
                case "Rain for Day":
                    return data.rainDay;
                case "Rain for Month":
                    return data.rainMonth;
                case "Barometric Pressure":
                    return data.barometricPressure;
                case "Dew Point":
                    return data.dewPoint;
                case "Wind Chill":
                    return data.windChill;
                case "Humidity":
                    return data.humidity;
                case "Heat Index":
                    return data.heatIndex;
                default:
                    return data.outsideTemperatureDegF;
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
        getLowerBoundaryDate(currentDate){
            return new Date(moment(currentDate).subtract(this.getDayCount(), 'days')).toUTCString();
        },
        clearGraph() {  // Removes all datasets and labels currently loaded to the graph
            // console.log("Clearing graph data...");              //Logging for Debug purposes
            while (this.graphData.datasets.length > 0){
                this.graphData.datasets.pop();
            }
            while (this.graphData.labels.length > 0){
                this.graphData.labels.pop();
            }
            while (this.dbData.length > 0){
                this.dbData.pop();
            }
            this.dataIndex = 0;
            // console.log("After Clearing... # of data points: " + this.graphData.datasets.length);   // Should be zero
            // console.log("After Clearing... # of labels: " + this.graphData.labels.length);          // Should be zero
            // console.log("After Clearing... # of data points: " + this.dbData.length);               // Should be zero
        }
    },
    mounted: function(){
        this.selectedDataSet = 'Wind Speed';       // 'Wind Speed' is default
        this.selectedTimeScale = 'Past Week';       // 'Past Week' is default
        this.retrieveData();                        // Populating without any valid data points results in dead graph
    },
    components: {
        Loading,
        LineChart
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
                            labelString: this.selectedDataSet,  // This only renders on mounted with valid data points
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