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
                    <v-card-text class="text--primary">Text Here</v-card-text>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark color="green">
                    <v-card-text class="px-5">OK</v-card-text>
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
                    <v-card-text>Text Here</v-card-text>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark color="green">
                    <v-card-text class="px-5">OK</v-card-text>
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
    
</style>