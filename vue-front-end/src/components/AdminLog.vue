<template>
    <v-container width = "100%">
        <div>
            <v-layout row wrap>
                <v-flex v-for="item in headers" :key="item.header" xs2>
                    <v-card  color="transparent" class = "elevation-0 headline">
                        <v-card-text class="text-xs-center">{{item.header}}</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
        <v-divider></v-divider>
        <v-layout row wrap v-for="log in logs" :key="log.id">
            <v-flex xs2>
                <v-tooltip bottom>
                    <v-card  color="transparent" class = "elevation-0 " slot = "activator">
                        <v-card-text class="text-xs-center">{{log.id}}</v-card-text>
                    </v-card>
                    <span>Log ID</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs2>
                <v-tooltip bottom>
                    <v-card  color="transparent" class = "elevation-0 " slot = "activator">
                        <v-card-text class="text-xs-center">{{log.action}} {{log.affectedTable}}</v-card-text>
                    </v-card>
                    <span>Action</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs2>
                <v-tooltip bottom>
                <v-card  color="transparent" class = "elevation-0 " slot = "activator">
                    <v-card-text class="text-xs-center">{{log.affectedRecordId}}</v-card-text>
                </v-card>
                <span>Record ID</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs2>
                <v-tooltip bottom>
                    <v-card  color="transparent" class = "elevation-0 " slot = "activator">
                        <v-card-text class="text-xs-center">{{log.success}}</v-card-text>
                    </v-card>
                    <span>Success</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs2>
                <v-tooltip bottom>
                    <v-card  color="transparent" class = "elevation-0 " slot = "activator">
                        <v-card-text class="text-xs-center">{{log.userId}}</v-card-text>
                    </v-card>
                    <span>User ID</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs2>
                <v-tooltip bottom>
                    <v-card  color="transparent" class = "elevation-0 " slot = "activator">
                        <v-card-text class="text-xs-center">{{log.userFirstName}} {{log.userLastName}}</v-card-text>
                    </v-card>
                    <span>Name</span>
                </v-tooltip>
            </v-flex>
        </v-layout>
        <div class="text-xs-center">
            <v-pagination
            circle
            v-model="pageDisplay"
            :length="numPages"
            @input = "next"
            :total-visible="7"
            ></v-pagination>
        </div>
    </v-container>
    
             
            <!-- <v-list>
                <v-container>
                    <v-list-tile v-for="log in logs" :key = log.id>
                        <span>
                            <v-list-tile-title class="text-sm-left">User Id</v-list-tile-title>
                            <v-list-tile-sub-title class="text-sm-left"> {{log.userId}}</v-list-tile-sub-title>
                        </span>
                        <v-spacer></v-spacer>
                        <span v-bind:style="{ color : '', fontWeight: 'bold'}">User Id:&nbsp;</span> {{ log.userId }} 
                        <span>
                            <v-list-tile-title class="text-sm-left">Name</v-list-tile-title>
                            <v-list-tile-sub-title class="text-sm-left"> {{log.userFirstName}} {{log.userLastName}}</v-list-tile-sub-title>
                        </span>
                        
                        <v-spacer></v-spacer>
                        <span v-bind:style="{ color : '', fontWeight: 'bold'}">Action:&nbsp;</span> {{ log.action }} {{ log.affectedTable }}
                        <span>
                            <v-list-tile-title class="text-xs-left">Action</v-list-tile-title>
                            <v-list-tile-sub-title class="text-sm-left"> {{log.action}} {{log.affectedTable}}</v-list-tile-sub-title>
                        </span>
                        <v-spacer></v-spacer>
                    
                </v-list-tile>
                </v-container>
            </v-list> -->
            
            
        
</template>
<script>
import router from '../router';
import ApiDriver from '../ApiDriver';
import HttpResponse from '../utils/HttpResponse';
import CurrentUserValidation from  '../utils/CurrentUserValidation';
export default {
    name: 'AdminLog',
    data() {
        return {
            
            pageNumber: 0,
            pageSize: 50,
            pageDisplay: 1,
            numPages: 0,
            
            logs: [],
            headers: [
                {header: 'Log ID'},
                {header: 'Action'},
                {header: 'Record ID'},
                {header: 'Success'},
                {header: 'User ID'},
                {header: 'Name'}
            ],
         
        }
            
    },
    methods: {
        getLogs() {
            ApiDriver.Log.viewLogs(this.pageNumber, this.pageSize).then((response) => {
                console.log(response)
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data)
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
                })
            }).catch((error) => {
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the logs<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                console.log(error)
            });
        },
        populateData(data){
            
            for (var index in data.content) {
                let log = data.content[index];
                if (!log.userId) {
                    log.userId = 'N/a';
                    log.userFirtName = 'N/a';
                    log.userLastName = "N/a";
                    
                }
                if(!log.affectedRecordId){
                    log.affectedRecordId = 'N/a';
                }
                this.logs.push(log);
                
            }
            this.numPages = data.totalPages;
        },
        next(page) {
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.logs = [];
            this.getLogs();
        }
        
    },
    mounted: function(){
        this.getLogs()
    }
}
</script>
<style scoped>
    .transparent {
        background-color: transparent!important;
        border-color: transparent!important;
    }
</style>

