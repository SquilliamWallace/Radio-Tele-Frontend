<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
        <h1>Security Footage</h1>

        <v-container grid text-xs-center>
            <!-- Headers -->
            <v-layout row align-center>
                <v-flex md4>
                    <v-card dark color="#666666" height="50px" >
                        <v-card-text>
                            <h2>Time Stamp</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#666666" height="50px">
                        <v-card-text>
                            <h2>Video Length</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#666666" height="50px">
                        <v-card-text>
                            <h2>View Thumbnails</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#666666" height="50px">
                        <v-card-text>
                            <h2>Stream Footage</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <!-- List starts here... -->
            <v-layout row align-center>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px" >
                        <v-card-text>
                            2019-11-20 13:20
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px">
                        <v-card-text>
                            00:01:06
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px">
                        <v-btn color="black" >View Thumbnails</v-btn>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px">
                        <v-btn color="black" >Stream Footage</v-btn>
                    </v-card>
                </v-flex>
            </v-layout>

            <v-layout row align-center>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px" >
                        <v-card-text>
                            2019-11-19 09:54
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px">
                        <v-card-text>
                            00:00:43
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px">
                        <v-btn color="black" >View Thumbnails</v-btn>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px">
                        <v-btn color="black" >Stream Footage</v-btn>
                    </v-card>
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
import Loading from "../../components/utility/Loading";
import moment from 'moment';    // Is this page going to be working with dates. 
export default {
    name: 'SecurityFootage',
    data(){
        return {
            
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
.security-footage-text {
    text-align: center;
    color: white; 
    text-decoration-color: white;
}
</style>