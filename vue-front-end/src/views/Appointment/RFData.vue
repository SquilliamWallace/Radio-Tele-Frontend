<template>
  <div>
    <navigation-bar></navigation-bar>
    <loading v-show="$store.state.isLoading"></loading>
    <div v-show="!$store.state.isLoading">
        <v-data-table
        :headers="headers"
        :items="RFData"
        hide-actions
        class="elevation-1"
        >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs">{{ props.item.appointmentId }}</td>
            <td class="text-xs">{{ props.item.intensity }}</td>
            <td class="text-xs">{{ props.item.timeCaptured }}</td>
        </template>
        </v-data-table>
        <v-dialog hide-overlay transition="dialog-bottom-transition" v-model="graphToggle">
            <v-btn color="primary darken-1" slot="activator">View Data Graph</v-btn>
            <div class="graph-style">
                <rf-data-graph v-model="graphData" :styles="graphStyles"></rf-data-graph>
            </div>
        </v-dialog>
        <v-dialog width=50% v-model="multipleAppointmentToggle">
            <loading v-show="$store.state.isLoading"></loading>
            <v-card v-show="!$store.state.isLoading" class="app-style">
                <v-text-field
                    v-model="multipleAppointmentId"
                    type="number"
                    label="Appointment ID to add"
                    :rules="[rules.appointmentIdRequired]">
                </v-text-field>
                <v-card-actions>
                    <v-btn color="success" @click="retrieveAdditionalAppointment(multipleAppointmentId)">Add to Graph</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn color="primary darken-1" @click="downloadRFData({ filename: 'rf-data.csv'})">Download as CSV</v-btn>
        <v-btn color="primary darken-1" @click="multipleAppointmentGraph()">View Multiple Appointments</v-btn>
    </div>
  </div>
</template>

<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import NavigationBar from '../../components/utility/NavigationBar';
import Loading from '../../components/utility/Loading';
import RfDataGraph from '../../components/visualization/RfDataGraph';
import moment from 'moment';
import Chart from 'chart.js';
export default {
    title: "Radio Telescope 1.1.0",
    name: 'RFData',
    data() {
        return {
            headers: [
                {text: 'RF ID', align: 'left', value: 'rfId'},
                {text: 'Appointment ID', align: 'left', value: 'appointmentId'},
                {text: 'Intensity', align: 'left', value: 'intensity'},
                {text: 'Time Captured', align: 'left', value: 'intensity'}
            ],
            RFData: [],
            multipleAppointmentToggle: false,
            multipleAppointmentId: 0,
            dataIndex: 0,
            graphToggle: false,
            graphData: {
                labels: [],
                datasets: []
            },
            rules: {
                appointmentIdRequired: val => (val && val.length > 0) || 'Required field',
            }
        }
    },
    methods: {
        retrieveData() {
            // Set the store's loading boolean to true
            this.$store.commit("loading", true);

            // Make the API call
            ApiDriver.Appointment.data(this.$route.params.appointmentId).then((response) => {
                // Handle the server response
                HttpResponse.then(response, (data) => {
                    // Populate the data and set the store's boolean back to false
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
            // }).catch(errors => {
            //     // Handle an erroneous API Call
            //     let message = "An error occurred when loading the RF data for this observation"
            //     HttpResponse.generalError(this, message, true)
            // })
        },
        populateData(data) {
            // Populate the RF Data array
            for (var index in data) {
                let rfData = data[index];
                rfData.timeCaptured = moment(rfData.timeCaptured).format('MM/DD/YYYY hh:mm:ss A')
                this.RFData.push(rfData)
                this.graphData.labels.push(rfData.timeCaptured)
                if(this.graphData.datasets.length <= this.dataIndex){
                    this.graphData.datasets.push({label: 'Appointment #' + rfData.appointmentId, backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16), fill: false, data: []})
                }
                this.graphData.datasets[this.dataIndex].data.push({y: rfData.intensity, x: rfData.timeCaptured})
                this.graphData.datasets[this.dataIndex].label = 'Appointment #' + rfData.appointmentId
            }
            this.dataIndex +=1;
        },
        showGraph() {
            this.graphToggle=!this.graphToggle;
        },
        convertRFDataToCSV(rfdata) {
            var result, counter, keys, columnDelim, lineDelim, data;

            data = rfdata.data || null;
            if (data==null || !data.length) {
                return null
            }

            columnDelim = rfdata.columnDelim || ','
            lineDelim = rfdata.lineDelim || '\n'

            keys = Object.keys(data[0])

            result= ''
            result += keys.join(columnDelim)
            result += lineDelim

            data.forEach(function(item) {
                counter = 0;
                keys.forEach(function(key) {
                    if (counter >0) {
                        result += columnDelim
                    }
                    result += item[key]
                    counter++
                })
                result += lineDelim
            })
            return result;
        },
        downloadRFData(rfdata) {
            var data, filename, link
            var csv = this.convertRFDataToCSV({
                data: this.RFData
            })
            if (csv==null){
                return;
            }
            filename = rfdata.filename || 'rfdata.csv'
            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv
            }
            data = encodeURI(csv)
            link = document.createElement('a')
            link.setAttribute('href', data)
            link.setAttribute('download', filename)
            link.click()
        },
        multipleAppointmentGraph(){
            this.multipleAppointmentToggle = true;
        },
        retrieveAdditionalAppointment(id){ 
            this.$store.commit("loading", true);

            // Make the API call
            ApiDriver.Appointment.data(id).then((response) => {
                // Handle the server response
                HttpResponse.then(response, (data) => {
                    // Populate the data and set the store's boolean back to false
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
            }).catch(errors => {
                // Handle an erroneous API Call
                let message = "An error occurred when loading the RF data for this observation"
                HttpResponse.generalError(this, message, true)
            })
            this.multipleAppointmentToggle = !this.multipleAppointmentToggle;
        }
    },
    components: {
        NavigationBar,
        Loading,
        RfDataGraph
    },
    mounted() {
        this.retrieveData()
        this.$store.commit("updateInfo", {page: "Radio Frequency Data", info: "Displays the R.F. data for a given appointment. The\n button at the bottom of the page will display a graph\n of the data as a factor of intensity over time."})
    },
    computed: {
        graphStyles() {
            return {
                height: '600px',
                position: 'relative'
            }
        }
    }
}
</script>
<style scoped>
.graph-style{
    background-color: #f0ead6;
}
.app-style{
    padding: 25px;
}
</style>
