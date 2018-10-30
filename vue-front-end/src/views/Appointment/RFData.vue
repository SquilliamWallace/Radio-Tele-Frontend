<template>
  <v-app>
    <navigation-bar></navigation-bar>
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
  </v-app>
</template>

<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import NavigationBar from "../../components/NavigationBar.vue";
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
            ApiDriver.Appointment.data(this.$route.params.appointmentId).then((response) => {
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data);
                }, (status, errors) => {
                    if (parseInt(status) === 403) {
                        this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">Access Denied<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                        CurrentUserValidation.validateCurrentUser(this.$store);
                    }
                })
            }).catch(error => {
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the RF data for this appointment<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                console.log(error)
            })
        },
        populateData(data) {
            for (var index in data) {
                let rfData = data[index];
                rfData.timeCaptured = moment(rfData.timeCaptured).format('MM/DD/YYYY hh:mm:ss A')
                this.RFData.push(rfData)
            }
        }
    },
    components: {
        NavigationBar
    },
    mounted() {
        this.retrieveData()
    }
}
</script>

<style scoped>

</style>
