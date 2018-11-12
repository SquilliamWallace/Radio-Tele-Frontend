<template>
  <div>
    <navigation-bar></navigation-bar>
    <loading v-show="$store.state.isLoading"></loading>
    <v-data-table
      :headers="headers"
      :items="RFData"
      hide-actions
      class="elevation-1"
      v-show="!$store.state.isLoading"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs">{{ props.item.appointmentId }}</td>
        <td class="text-xs">{{ props.item.intensity }}</td>
        <td class="text-xs">{{ props.item.timeCaptured }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import NavigationBar from '../../components/NavigationBar';
import Loading from '../../components/Loading';
import moment from 'moment';
export default {
    name: 'RFData',
    data() {
        return {
            headers: [
                {text: 'RF ID', align: 'left', value: 'rfId'},
                {text: 'Appointment ID', align: 'left', value: 'appointmentId'},
                {text: 'Intensity', align: 'left', value: 'intensity'},
                {text: 'Time Captured', align: 'left', value: 'intensity'}
            ],
            RFData: []
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
            }
        }
    },
    components: {
        NavigationBar,
        Loading
    },
    mounted() {
        this.retrieveData()
    }
}
</script>
<style scoped>

</style>
