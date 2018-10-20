<template>
    <div>
      
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

        <v-tab-item>
                <admin-user-management></admin-user-management>
        </v-tab-item>

        <v-tab-item>
            
        </v-tab-item>

        <v-tab-item>
            
        </v-tab-item>
        
      </v-tabs>

  </div>
</template>
<script>
import AdminUserManagement from '../components/AdminUserManagement.vue'
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
    components: {
        AdminUserManagement
    }
  }
</script>
<style scoped>

</style>
