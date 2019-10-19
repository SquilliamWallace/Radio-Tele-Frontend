<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">

    <v-data-table
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
        <!--  -->
        <template slot="items" slot-scope="props">
            <tr
            @click="updateForm(props.item.name, props.item.id, props.item.declination, props.item.hours, props.item.minutes, props.item.seconds)"
            >
            <!-- <td class="text-xs-left">{{ props.item.id }}</td> -->
            <td class="text-xs-center">{{ props.item.text }}</td>
            <td class="text-xs-center">{{ props.item.val }}</td>
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
        </v-flex>
    </v-layout>

    <!-- This data table is for specific weather data -->
    <v-data-table
        v-if="!$store.state.isLoading"
        hide-actions
        :headers="dataHeaders"
        :items="getItemSet"
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
            <td class="text-xs-center">{{ props.item.text }}</td>
            <td class="text-xs-center">{{ props.item.val }}</td>
            </tr>
        </template>
    </v-data-table>

    <v-dialog hide-overlay transition="dialog-bottom-transition" v-model="graphToggle">
            <v-btn color="primary darken-1" slot="activator">View Data Graph</v-btn>
            <div class="graph-style">
                <rf-data-graph v-model="graphData" :styles="graphStyles"></rf-data-graph>
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
import RfDataGraph from '../../components/visualization/RfDataGraph';

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
                'Temperature',
                'Wind Speed',
                'Rain Gauge'
            ],
            selectedDataSet: '',
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

        }
    },
    methods:{
        
    },
    mounted: function(){
        this.selectedDataSet = 'Temperature';   // Temperature is default
    },
    components: {
        Loading,
        RfDataGraph
    },
    computed: {
        graphStyles() {
            return {
                height: '600px',
                position: 'relative'
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