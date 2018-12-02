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
            User Management
            <v-icon>account_box</v-icon>
        </v-tab>
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

        <v-tab-item>
          <admin-user-management></admin-user-management>
        </v-tab-item>
        
        <v-tab-item>
          <admin-log></admin-log>
        </v-tab-item>

        <v-tab-item>
            <admin-user-approval></admin-user-approval>
        </v-tab-item>
        
      </v-tabs>

  </div>
</template>
<script>
import AdminLog from '../components/AdminLog.vue'
import AdminUserManagement from '../components/AdminUserManagement.vue';
import ApiDriver from '../ApiDriver';
import HttpResponse from '../utils/HttpResponse';
import NavigationBar from '../components/NavigationBar.vue';
import router from '../router';
import CurrentUserValidation from '../utils/CurrentUserValidation';
import AdminUserApproval from '../components/AdminUserApproval.vue';
import Loading from "../components/Loading"
 export default {
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
        Loading
    },
    mounted() {
      this.authenticate()
      this.$store.commit("updateInfo", {page: "Administration", info: "- User Management: On this page, individual user\n profiles can be viewed by clicking the account icon.\n Users can be banned with the gavel icon or unbanned\n with the lock icon.\n" + "\n" +
                                                                      "- Logging: On this page, all database transactions can\n be viewed with associated information. Click on an\n individual log in the table to get more detailed\n information.\n" + "\n" +
                                                                      "- User Approval: This page displays a list of users with\n unapproved roles. Upon clicking the approve button, a\n pop-up will appear that will allow you to select\n the role you wish to assign."})
    }
  }
</script>
<style scoped>

</style>
