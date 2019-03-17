<template dark>
    <v-dialog v-model="advSearch" persistent max-width="600px">
      <v-btn slot="activator" dark icon class="mt-3 " dark><v-icon>add_circle_outline</v-icon></v-btn>

      <v-card>
        <v-container align-content-center>
            <span  class="headline">{{ errorsList }}</span>

            <v-container fluid>
                    <v-text-field
                        v-model="vals.name"
                        label="Name"
                    ></v-text-field>
                    <v-text-field
                        v-model="vals.dec"
                        label="Declination"
                    ></v-text-field>
                    <v-text-field
                        v-model="vals.hour"
                        label="Hours"
                    ></v-text-field>
                    <v-text-field
                        v-model="vals.min"
                        label="Minutes"
                    ></v-text-field>
                    <v-text-field
                        v-model="vals.sec"
                        label="Seconds"
                    ></v-text-field>
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

    props:['errorsList'],

    methods: {
        sendValues:function(){
            
            this.$emit('sendValues',this.vals)
        }
    }
}
</script>

<style scoped>

</style>