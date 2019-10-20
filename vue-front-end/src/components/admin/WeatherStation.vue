<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">

    <!-- This is the table for the current data -->
    <!-- <v-data-table
        v-if="!$store.state.isLoading"
        hide-actions
        :headers="headers"
        :items="bodies"
        :pagination.sync="pagination"
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
        <template slot="items" slot-scope="props">
            <tr
            @click="updateForm(props.item.name, props.item.id, props.item.declination, props.item.hours, props.item.minutes, props.item.seconds)"
            >
            <td class="text-xs-center">{{ props.item.text }}</td>
            <td class="text-xs-center">{{ props.item.val }}</td>
            </tr>
        </template>
    </v-data-table> -->

    <!-- This data table is for specific weather data -->
    <v-data-table
        v-if="!$store.state.isLoading"
        :headers="dbHeaders"
        :items="dbData"
        :pagination.sync="pagination"
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
        <v-flex xs12 sm1>
            <v-select
                v-model="selectedDataSet"
                :items="dataSetList"
                label="Data Set"
            >
            </v-select>
            <v-select
                v-model="selectedTimeScale"
                :items="timeScaleList"
                label="Time Scale"
            >
            </v-select>
        </v-flex>
    </v-layout>

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
            // These headers and data items are for reporting current weather conditions
            headers: [
                { text: 'Data Set', align: 'left', sortable: false, value: 'dataName'},
                { text: 'Current Conditions', sortable: false, value: 'val' }
            ],
            bodies: [
                { id: 1, text: 'Temperature', val: "81 °F"},
                { id: 2, text: 'Wind Speed', val: "24 mph"},
                { id: 3, text: 'Rain Gauge', val: "2.0 in"}
            ],
            dataSetList: [
                'Wind Speed',
                'Wind Direction',
                'Temperature',
                'Rain Rate',
                'Rain Total',
                'Rain for Day',
                'Barometric Pressure',
                'Dew Point',
                'Wind Chill',
                'Heat Index'
            ],
            timeScaleList: [
                'Past Day',
                'Past Week',
                'Past Month',
                'Past 6 Months',
                'Past Year',
                'Past 5 Years'
            ],
            selectedDataSet: '',
            selectedTimeScale: '',
            graphToggle: false,
            graphData: {
                labels: [],
                datasets: []
            },
            // Items for second data table
            dataHeaders: [
                { text: 'Value', align: 'left', sortable: false, value: 'dataName2'},
                { text: 'Time Recorded', sortable: false, value: 'val2' }
            ],
            // The following data sets is hardcoded dummy data
            tempData: [
                { id: 1, text: '81 °F', val: "10-19-2019 12:23 PM"},
                { id: 2, text: '74 °F', val: "10-19-2019 10:13 AM"},
                { id: 3, text: '82 °F', val: "10-19-2019 8:09 AM"}
            ],
            windData: [
                { id: 1, text: '24 mph', val: "10-19-2019 12:23 PM"},
                { id: 2, text: '0 mph', val: "10-19-2019 10:13 AM"},
                { id: 3, text: '18 mph', val: "10-19-2019 8:09 AM"}
            ],
            rainData: [
                { id: 1, text: '2.0 in', val: "10-19-2019 12:23 PM"},
                { id: 2, text: '1.6 in', val: "10-19-2019 10:13 AM"},
                { id: 3, text: '0.5 in', val: "10-19-2019 8:09 AM"}
            ],
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
                {   id: 1, timeStamp: "10-20-2019 5:00:00 PM", windSpeed: "13", windDirection: "NW", tempF: "76", 
                    rainRate: "2.0", rainTotal: "2.0", rainDay: "3.0", pressure: "1.0" ,
                    dewPoint: "72", windChill: "68", heatIndex: "91"},
                {   id: 2, timeStamp: "10-19-2019 10:30:00 AM", windSpeed: "16", windDirection: "NE", tempF: "78", 
                    rainRate: "0.5", rainTotal: "0.9", rainDay: "1.1", pressure: "1.0" ,
                    dewPoint: "61", windChill: "64", heatIndex: "97"},
                {   id: 3, timeStamp: "10-18-2019 5:00:00 PM", windSpeed: "11", windDirection: "S", tempF: "81", 
                    rainRate: "1.2", rainTotal: "1.5", rainDay: "2.0", pressure: "1.0" ,
                    dewPoint: "59", windChill: "66", heatIndex: "101"},
                {   id: 4, timeStamp: "10-18-2019 10:31:00 AM", windSpeed: "24", windDirection: "E", tempF: "75", 
                    rainRate: "2.9", rainTotal: "3.0", rainDay: "2.0", pressure: "1.0" ,
                    dewPoint: "62", windChill: "44", heatIndex: "98"} 
            ],
            WSData: [],
            dataIndex: 0,

        }
    },
    methods:{
        populateData(data) { // This method has been modified
            console.log("Populating data...");
            console.log(data);
            // Populate the RF Data array
            for (var index in data) {
                let wsData = data[index];
                wsData.timeCaptured = moment(wsData.timeStamp).format('MM/DD/YYYY hh:mm:ss A')
                console.log(wsData.timeCaptured);
                this.WSData.push(wsData)
                this.graphData.labels.push(wsData.timeStamp)
                if(this.graphData.datasets.length <= this.dataIndex){
                    this.graphData.datasets.push({label: 'ID #: ' + wsData.id, backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16), fill: false, data: []})
                    console.log(this.graphData.datasets.length);
                }
                this.graphData.datasets[this.dataIndex].data.push({y: wsData.tempF, x: wsData.timeStamp})
                this.graphData.datasets[this.dataIndex].label = 'ID #: ' + wsData.id
            }
            this.dataIndex +=1;
            console.log(this.graphStyles);
        }
    },
    mounted: function(){
        this.selectedDataSet = 'Temperature';   // Temperature is default
        this.selectedTimeScale = 'Past Day';    // 'Past Day' is default
        this.populateData(this.dbData); 
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
                backgroundColor: '#46464a',
            }
        },
        getItemSet : function(){    // used to determine which data set to load
            if (this.selectedDataSet == 'Temperature'){
                return this.tempData;
            }
            else if (this.selectedDataSet == 'Wind Speed'){
                return this.windData;
            }
            else if (this.selectedDataSet == 'Rain Gauge'){
                return this.rainData;
            }
        }
    }
};

</script>
<style scoped>
    
</style>