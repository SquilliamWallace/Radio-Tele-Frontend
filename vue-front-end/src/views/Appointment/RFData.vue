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
                <rf-data-graph :chartdata="graphData" :styles="graphStyles"></rf-data-graph>
            </div>
        </v-dialog>
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
            graphToggle: false,
            graphData: {
                labels: [],
                datasets: [
                    {
                        label: 'Radio Frequency Intensity Over Time',
                        backgroundColor: '#0c03b2',
                        data: []
                    }
                ]
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
            }).catch(errors => {
                // Handle an erroneous API Call
                let message = "An error occurred when loading the RF data for this observation"
                HttpResponse.generalError(this, message, true)
            })
        },
        populateData(data) {
            // Populate the RF Data array
            for (var index in data) {
                let rfData = data[index];
                rfData.timeCaptured = moment(rfData.timeCaptured).format('MM/DD/YYYY hh:mm:ss A')
                this.RFData.push(rfData)
                this.graphData.labels.push(rfData.timeCaptured)
                this.graphData.datasets[0].data.push(rfData.intensity)
            }
        },
        showGraph() {
            this.graphToggle=!this.graphToggle;
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
</style>
