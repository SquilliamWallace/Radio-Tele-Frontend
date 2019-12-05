<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
        <h1>Security Footage</h1>

        <v-container grid text-xs-center fluid>
            <!-- Headers -->
            <!-- Still trying to create generic solution for headers (hard coded for now) -->
            <v-layout row align-center>
                <v-flex md4>
                    <v-card dark color="#555555" height="50px" >
                        <v-card-text>
                            <h2>Time Stamp</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#555555" height="50px">
                        <v-card-text>
                            <h2>Video Length</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#555555" height="50px">
                        <v-card-text>
                            <h2>View Thumbnails</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md4>
                    <v-card dark color="#555555" height="50px">
                        <v-card-text>
                            <h2>Stream Footage</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <!-- List starts here... -->
            <div v-for="video in dbVideos" :key="video.id">
                <v-layout row align-center>
                    <!-- Generic Solution: This block of code gets put into a row for each video file -->
                    <v-flex md4>
                        <v-card dark color="#666666" height="50px" >
                            <v-card-text>
                                {{ video.recordCreatedTimestamp }}
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex md4>
                        <v-card dark color="#666666" height="50px">
                            <v-card-text>
                                {{ video.videoLength }}
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex md4>
                        <v-card dark color="#666666" height="50px">
                            <v-dialog hide-overlay transition="dialog-bottom-transition" v-model="video.thumbnailToggle">
                                <v-btn color="primary darken-2" slot="activator">View Thumbnails</v-btn>
                                <v-card dark color="#FFFFFF" height="600px">
                                    <v-card-text>
                                        <div class="security-footage-text">
                                            Thumbnails from {{video.recordCreatedTimestamp}}
                                        </div>
                                        <v-img 
                                        :src="video.thumbnailPath"
                                        height="400px"
                                        
                                        ></v-img>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-card>
                    </v-flex>
                    <v-flex md4>
                        <v-card dark color="#666666" height="50px">
                            <v-dialog hide-overlay transition="dialog-bottom-transition" v-model="video.streamToggle">
                                <v-btn color="primary darken-2" slot="activator">Stream Footage</v-btn>
                                <v-card dark color="#FFFFFF" height="600px">
                                    <v-card-text>
                                        <div class="security-footage-text">
                                            Footage from {{video.recordCreatedTimestamp}}
                                        </div>
                                        <v-card color="#000000" height="500px"></v-card>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-card>
                    </v-flex>
                    
                </v-layout>
            </div>
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
            streamToggle: false,
            videos: [   // Dummy data
                { primeKey: 1, thumbnailPath: 'C:', videoPath: 'C:', videoLength: '00:01:06', createdTimeStamp: '2019-11-20 13:20', 
                  updatedTimeStamp: '2019-11-20 13:21', thumbnailToggle: false, streamToggle: false },
                { primeKey: 2, thumbnailPath: 'D:', videoPath: 'D:', videoLength: '00:00:43', createdTimeStamp: '2019-11-19 09:54', 
                  updatedTimeStamp: '2019-11-19 09:55', thumbnailToggle: false, streamToggle: false },
                { primeKey: 3, thumbnailPath: 'D:', videoPath: 'D:', videoLength: '00:02:00', createdTimeStamp: '2019-11-18 07:00', 
                  updatedTimeStamp: '2019-11-19 09:55', thumbnailToggle: false, streamToggle: false },
            ],
            totalVideos: 0,
            dbVideos: []
        }
    },
    methods:{
        getVideos(){
            this.$store.commit("loading", true);
            var lowerDate = new Date("12-03-2017").toUTCString();   // Set very old date to retieve all video files.
            var upperDate = new Date(Date.now()).toUTCString();     // Set current date to get newest video files.
            // console.log("lowerDate: " + lowerDate);              // Logging for debugging purposes
            // console.log("upperDate: " + upperDate);              // Logging for debugging purposes
            /* This API call is based off of the one used for retrieving logs. */
            ApiDriver.VideoFiles.viewVideoFiles(lowerDate, upperDate).then((response) => {            // Make API call to back end
                HttpResponse.then(response, (data) => {
                    this.populatData(data.data)                                                       // Take returned data and display
                    this.$store.commit("loading", false);
                }, (status, errors) => {
                    if (parseInt(status) === 403) {
                        this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">Access Denied<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                        CurrentUserValidation.validateCurrentUser(this.$store);
                    }
                    this.$store.commit("loading", false);
                })
            }).catch((error) => {
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the logs<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                this.$store.commit("loading", false);
            });
        },
        populatData(data){
            for (var index in data){
                let vidFile = data[index];
                vidFile.recordCreatedTimestamp = moment(vidFile.recordCreatedTimestamp).format('MM-DD-YYYY HH:MM');     // Convert timestamp format
                // console.log(JSON.stringify(vidFile));                                                                // Logging for debug Purposes
                this.dbVideos.push(vidFile);                                                                            // push video file onto array
            }
        }
    },
    mounted: function(){
        this.getVideos();   // Load video files on render
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