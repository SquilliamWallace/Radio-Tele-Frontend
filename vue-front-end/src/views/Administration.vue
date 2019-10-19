<template>
    <div>
      <navigation-bar></navigation-bar>
      <v-tabs
        slot="extension"
        color="transparent"
        grow
        icons-and-text
        centered 
      >
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab>
            Logging
            <v-icon>work</v-icon>
        </v-tab>
        <v-tab>
            User Approval
            <v-icon>check_circle</v-icon>
        </v-tab>
        <v-tab>
          Appointment Management
          <v-icon>event</v-icon>
        </v-tab>
        <v-tab>
            User Management
            <v-icon>account_box</v-icon>
        </v-tab>
        <v-tab>
          Celestial Body Management
          <v-icon>public</v-icon>
        </v-tab>
        <v-tab>
          Weather Station Data
          <v-icon>opacity</v-icon>
        </v-tab>
        
        <v-tab-item>
          <admin-log></admin-log>
        </v-tab-item>

        <v-tab-item>
            <admin-user-approval></admin-user-approval>
        </v-tab-item>

        <v-tab-item>
            <admin-appointment-approval></admin-appointment-approval>
        </v-tab-item>
        
        <v-tab-item>
          <admin-user-management></admin-user-management>
        </v-tab-item>

        <v-tab-item>
          <celestial-bodies></celestial-bodies>
        </v-tab-item>

        <v-tab-item>
          <weather-station></weather-station>
        </v-tab-item>
      </v-tabs>

  </div>
</template>
<script>
import AdminLog from '../components/admin/AdminLog.vue'
import AdminUserManagement from '../components/admin/AdminUserManagement.vue';
import ApiDriver from '../ApiDriver';
import HttpResponse from '../utils/HttpResponse';
import NavigationBar from '../components/utility/NavigationBar.vue';
import router from '../router';
import CurrentUserValidation from '../utils/CurrentUserValidation';
import AdminUserApproval from '../components/admin/AdminUserApproval.vue';
import AdminAppointmentApproval from '../components/admin/AdminAppointmentApproval.vue';
import CelestialBodies from '../components/admin/CelestialBodies.vue';
import Loading from "../components/utility/Loading";
import WeatherStation from "../components/admin/WeatherStation.vue"
 export default {
    title: "Radio Telescope 1.1.0",
    name: 'admin',
    data () {
      return {
        items: [
          'User Management', 'Logging', 'Surveillance',
        ],
        text: [
            'This is user management', 'This is logging', 'This is surveillance'
        ]
      }
    },
    methods: {
      authenticate() {
        ApiDriver.Auth.Admin().then(response => {
          HttpResponse.then(response, data => {
            this.$store.commit("login", data.data);
          }, (status, errors) => {
            HttpResponse.accessDenied(this);
          })
        })
      }
    },
    components: {
        AdminUserManagement,
        NavigationBar,
        AdminLog,
        AdminUserApproval,
        Loading,
        AdminAppointmentApproval,
        CelestialBodies,
        WeatherStation
    },
    mounted() {
      this.authenticate()
      this.$store.commit("updateInfo", {page: "Administration", info: "- User Management: On this page, individual user\n profiles can be viewed by clicking the account icon.\n Users can be banned with the gavel icon or unbanned\n with the lock icon.\n" + "\n" +
                                                                      "- Logging: On this page, all database transactions can\n be viewed with associated information. Click on an\n individual log in the table to get more detailed\n information.\n" + "\n" +
                                                                      "- User Approval: This page displays a list of users with\n unapproved roles. Upon clicking the approve button, a\n pop-up will appear that will allow you to select\n the role you wish to assign.\n" + "\n" +
                                                                      "- Appointment Management: This page displays a list of appointments\n which require administrator approval. This could be due to an\n appointment that is scheduled for an extended period of time, or\n one in which a user has exceeded their total allotted time."})
    }
  }
</script>
<style scoped>

</style>
