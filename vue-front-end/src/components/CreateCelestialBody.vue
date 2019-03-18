<template dark>
    <v-dialog v-model="advSearch" persistent max-width="600px">
      <v-btn slot="activator" dark icon class="mt-3 " ><v-icon>add_circle_outline</v-icon></v-btn>

      <v-card>
        <v-container align-content-center>
            <span  class="headline">Add Celestial Body</span>

            <v-container fluid>
                    <v-text-field
                        v-model="vals.name"
                        label="Name"
                    ></v-text-field>
                    <span style="color:red;font-size:12px">{{formErrors.name}}</span>
                    <v-text-field
                        v-model="vals.dec"
                        label="Declination"
                    ></v-text-field>
                    <span style="color:red;font-size:12px">{{formErrors.dec}}</span>
                    <v-text-field
                        v-model="vals.hour"
                        label="Hours"
                    ></v-text-field>
                    <span style="color:red;font-size:12px">{{formErrors.hour}}</span>
                    <v-text-field
                        v-model="vals.min"
                        label="Minutes"
                    ></v-text-field>
                    <span style="color:red;font-size:12px">{{formErrors.min}}</span>
                    <v-text-field
                        v-model="vals.sec"
                        label="Seconds"
                    ></v-text-field>
                    <span style="color:red;font-size:12px">{{formErrors.sec}}</span>
                    <v-container>
                    <v-btn @click="advSearch=false" color="Red" dark >Cancel</v-btn>
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

export default {
    props:['formErrors'],
    name: 'CreateCelestialBody',
    data() {
        return {
            advSearch: false, 
            vals:[
                {name: ""},
                {hour: ""},
                {min: ""},
                {sec: ""},
                {dec: ""},
            ]
            
        }
        
    },


    methods: {
        sendValues:function(){
            
            this.$emit('sendValues',this.vals)
            console.log(this.formErrors.dec)
        }
    }
}
</script>

<style scoped>

</style>