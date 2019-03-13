<template dark>
    <v-dialog v-model="advSearch" persistent width="50%">
      <v-btn slot="activator" class="mt-3" dark>Appointment Search</v-btn>

      <v-card>
        <v-container align-content-center>
            <span  class="headline">User Appointment Search</span>
        </v-container>
        <v-card-text>
          <v-container grid-list-md>
              <v-layout row>
              <v-flex xs6>
                <v-container fluid>
                    <v-checkbox label="Start Date"></v-checkbox>
                    <v-checkbox label="End Date"></v-checkbox>
                    <v-checkbox label="Right Ascension Hours"></v-checkbox>
                    <v-checkbox label="Right Ascension Minutes"></v-checkbox>
                    <v-checkbox label="Right Ascension Seconds"></v-checkbox>
                    <v-checkbox label="Declination"></v-checkbox>
                    <v-checkbox label="Telescope"></v-checkbox>
                </v-container>
            </v-flex>
             <v-flex xs6>
                <v-container fluid>
                    <v-text-field
                        label="Search"
                    ></v-text-field> 
                </v-container>
                <v-container>
                    <v-btn @click="advSearch=false" color="Red" dark >Cancel</v-btn>
                    <v-btn color="Green" dark >Search</v-btn>
                </v-container>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog >
</template>

<script>

export default {
    data() {
        name: "Search Appointment"
        return {
           advSearch: false, 
        }
    },

    props: {
        
    },

    methods: {
        

    }
}
</script>

<style scoped>

</style>