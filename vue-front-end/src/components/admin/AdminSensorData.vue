<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
          <!-- Insert code here -->
          <h1>Sensor Data</h1>

<v-container grid text-xs-center>
    <v-layout row>
        <v-flex md4>
                <v-card dark >                 
                        <div class="sensor-name">Overall</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark color="red">
                    <div class="sensor-status">Error</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>
    
    <v-layout row>
        <v-flex md4>
                <v-card dark >
                        <div class="sensor-name">Gate</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark color="yellow">
                    <div class="sensor-status">Warning</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md4>
                <v-card dark >
                        <div class="sensor-name">Proximity</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark color="green">
                    <div class="sensor-status">OK</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md4>
                <v-card dark >
                        <div class="sensor-name">Azimuth Motor</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark color="red">
                    <div class="sensor-status">Error</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>

</v-container>
</v-card>

</div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading"
import moment from 'moment';    // Is this page going to be working with dates. 
export default {
    name: 'SensorData',
    data(){
        return {
            // insert data
        }
    },
    methods:{
        
    },
    mounted: function(){

    },
    components: {
        Loading
    },
    computed: {
        
    }
};
</script>
<style scoped>
.sensor-name {
    text-align: center;
    color: white; 
    font-size: 35px;
    /* text-decoration: underline; */
    text-decoration-color: white;
}
.sensor-status {
    text-align: center;
    color: black; 
    font-size: 35px;
    /* text-decoration: underline; */
    text-decoration-color: white;
}
</style>