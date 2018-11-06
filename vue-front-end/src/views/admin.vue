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
            Surveillance
            <v-icon>videocam</v-icon>
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
            this.$swal({
              title: '<span style="color:#f0ead6">Error!<span>',
              html: '<span style="color:#f0ead6">Access Denied<span>',
              type: 'error',
              background: '#302f2f'
            }).then(response => {
              CurrentUserValidation.validateCurrentUser(this.$store);
            });
          })
        })
      }
    },
    components: {
        AdminUserManagement,
        NavigationBar,
        AdminLog
    },
    mounted() {
      this.authenticate()
    }
  }
</script>
<style scoped>

</style>
