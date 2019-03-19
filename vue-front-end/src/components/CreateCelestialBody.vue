<template dark>
    <v-dialog v-model="celestialBodyForm" persistent max-width="600px">
      <v-btn slot="activator" dark icon class="mt-3 " ><v-icon>add_circle_outline</v-icon></v-btn>

      <v-card>
        <v-container align-content-center>
            <span  class="headline">Add Celestial Body</span>

            <v-container fluid>
                    <v-text-field
                        v-model="vals.name"
                        label="Name"
                        :error=formErrors.name.hasError
                        :error-messages=formErrors.name.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.name}}</span> -->
                    <v-text-field
                        v-model="vals.dec"
                        label="Declination"
                        type="number"
                        :rules="[rules.numRequired]"
                        :error=formErrors.declination.hasError
                        :error-messages=formErrors.declination.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.dec}}</span> -->
                    <v-text-field
                        v-model="vals.hour"
                        label="Hours"
                        type="number"
                        :rules="[rules.rightAscHours]"
                        :error=formErrors.hours.hasError
                        :error-messages=formErrors.hours.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.hour}}</span> -->
                    <v-text-field
                        v-model="vals.min"
                        label="Minutes"
                        type="number"
                        :rules="[rules.rightAscMinutes]"
                        :error=formErrors.minutes.hasError
                        :error-messages=formErrors.minutes.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.min}}</span> -->
                    <v-text-field
                        v-model="vals.sec"
                        label="Seconds"
                        type="number"
                        :rules="[rules.rightAscSeconds]"
                        :error=formErrors.seconds.hasError
                        :error-messages=formErrors.seconds.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.sec}}</span> -->
                    <v-container>
                    <v-btn @click="cancel" color="Red" dark >Cancel</v-btn>
                    <v-btn @click="sendValues()" color="Green" dark >Submit</v-btn>
                    </v-container>
                </v-container>

        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
import { error } from 'util';
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import ApiDriver from "../ApiDriver";
import CustomErrorHandler from "../utils/CustomErrorHandler";


export default {
    props:['formErrors','success'],
    name: 'CreateCelestialBody',
    data() {
        return {
            celestialBodyForm: false, 
            vals:[
                {name: ""},
                {hour: ""},
                {min: ""},
                {sec: ""},
                {dec: ""},
            ],
            rules:{
                rightAscHours: val => (val && val.toString().length > 0 && val < 24 && val >= 0) || 'Must be between 0 and 23 hours',
                rightAscMinutes: val => (val && val.toString().length > 0 && val < 60 && val >= 0) || 'Must be between 0 and 59 minutes',
                rightAscSeconds: val => (val && val.toString().length > 0 && val < 60 && val >= 0) || 'Must be between 0 and 59 seconds',
                numRequired: val => (val && val.toString().length > 0 && val <=90 && val >= -90) || 'Must be between 90 and -90'
            },
            successFlag: this.success
            
        }
        
    },
    methods: {
        sendValues:function(){
            this.$emit('sendValues',this.vals)
            
        },
        closeForm(){
            if(this.success === true){
                
            }
        },
        resetForm:function(){
            this.$emit('resetForm')
        },
      cancel() {
          
          this.celestialBodyForm = false
          
          this.vals.name = ""
          this.vals.hour = ""
          this.vals.min = ""
          this.vals.sec = ""
          this.vals.dec = ""

          this.resetForm()
      }
    }
}
</script>

<style scoped>

</style>