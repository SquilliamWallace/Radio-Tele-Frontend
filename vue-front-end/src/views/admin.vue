<template>
    <div>
    <v-toolbar
      dark
      tabs
    >
      
      <v-tabs
        slot="extension"
        v-model="tab"
        color="transparent"
        grow
      >
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab>User Managment</v-tab>
        <v-tab>Logging</v-tab>
        <v-tab>Surveillance</v-tab>

        <v-tab-item>
            <v-card flat width = "100%">
                <v-card-item>User Management</v-card-item>
            </v-card>
        </v-tab-item>

        <v-tab-item>
            <v-card flat>
                <v-card-item>Logging</v-card-item>
            </v-card>
        </v-tab-item>

        <v-tab-item>
            <v-card flat>
                <v-card-item>Surveillance</v-card-item>
            </v-card>
        </v-tab-item>
        
      </v-tabs>
    </v-toolbar>

  </div>
</template>
<script>
 export default {
     name: 'admin',
    data () {
      return {
        tab: null,
        items: [
          'User Management', 'Logging', 'Surveillance',
        ],
        text: [
            'This is user management', 'This is logging', 'This is surveillance'
        ]
      }
    }
  }
</script>
<style scoped>

</style>
