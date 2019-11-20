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
                        <v-dialog hide-overlay transition="dialog-bottom-transition" v-model="thumbnailToggle">
                            <v-btn color="black" slot="activator">View Thumbnails</v-btn>
                            <v-card dark color="#FFFFFF" height="600px">
                                <v-card-text>
                                    <div class="security-footage-text">
                                        Thumbnails from 2019-11-20 13:20
                                    </div>
                                    <v-img 
                                    src="https://camo.githubusercontent.com/2cecaa8ef676731e38222c695e48377037817c92/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323732353631312f313436303736372f36346330393061652d343436642d313165332d396237662d3534643432333132383631662e706e67"
                                    height="400px"
                                    contain="true"
                                    ></v-img>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#878787" height="50px">
                        <v-dialog hide-overlay transition="dialog-bottom-transition" v-model="streamToggle">
                            <v-btn color="black" slot="activator">Stream Footage</v-btn>
                            <v-card dark color="#FFFFFF" height="600px">
                                <v-card-text>
                                    <div class="security-footage-text">
                                        Footage from 2019-11-20 13:20
                                    </div>
                                    <v-card color="#000000" height="500px"></v-card>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
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
            thumbnailToggle: false,
            streamToggle: false
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
    color: black; 
    text-decoration-color: black;
}
</style>