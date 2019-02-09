<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    <v-data-table
      @input="toggleDetails($event[0])"
      v-if="!$store.state.isLoading"
      hide-actions
      :headers="headers"
      :items="logs"
      :pagination.sync="pagination"
      select-all
      item-key="name"
      class="elevation-1"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.action }}</td>
          <td>{{ props.item.affectedRecordId }}</td>
          <td>{{ props.item.success }}</td>
          <td>{{ props.item.userId }}</td>
          <td>{{ props.item.userName}}</td>
        </tr>
      </template>
      <template slot="footer">
        
            
          
        
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
      </v-alert>  
    </v-data-table>
        <v-pagination
                circle
                v-model="pageDisplay"
                :length="numPages"
                @input = "next"
                :total-visible="15"
            ></v-pagination>
        <v-layout justify-center>
            <v-flex xs12 sm1>
                <v-select
                v-model="selectedPageSize"
                :items="pageSizeList"
                label="Items per page"
                v-on:change="this.pageSizeUpdate"
                
                ></v-select>
            </v-flex>
        </v-layout>

    </v-card>
    <v-dialog dark v-model="toggleDetailedView">
        <loading v-if="$store.state.isLoading"></loading>
        <v-card v-if="!$store.state.isLoading" class="card-style">
            <h1 v-if="currentLog.success">Log Number {{currentLog.id}}: Successful Operation</h1>
            <h1 v-if="!currentLog.success">Log Number {{currentLog.id}}: Unsuccessful Operation</h1>
            <v-container grid-list-xl fluid>
                <v-layout wrap>
                    <v-flex xs12 sm12>
                        <h2>Date of Occurrence:</h2>
                        <span>{{currentLog.timestamp}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <h3>Attempted Operation:</h3>
                        <span>{{currentLog.action}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <h3>Name of User:</h3>
                        <span>{{currentLog.userName}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <h3>Affected Table:</h3>
                        <span>{{currentLog.affectedTable}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <h3>Affected Record ID:</h3>
                        <span>{{currentLog.affectedRecordId}}</span>
                    </v-flex>
                    <v-flex xs12 sm12 v-if="!currentLog.success">
                        <h2>Errors:</h2>
                        <li v-bind:key="error.id" v-for="error in currentLog.errors">
                            {{error.field}} {{error.message}}
                        </li>
                    </v-flex>
                </v-layout>
                </v-container>
            <v-card-actions>
                <v-btn flat color="blue" @click="toggleDetailedView = !toggleDetailedView">Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
</template>
<script>
import router from '../router';
import ApiDriver from '../ApiDriver';
import HttpResponse from '../utils/HttpResponse';
import CurrentUserValidation from  '../utils/CurrentUserValidation';
import Loading from "../components/Loading"
import moment from 'moment'
export default {
    name: 'AdminLog',
    data() {
        return {
            pagination: {
                sortBy: 'name',
                totalItems: 0,
                page: 1,
                rowsPerPage: 55
            },
            currentLog: {},
            pageNumber: 0,
            pageSize: 25,
            selectedPageSize: "15",
            pageDisplay: 1,
            numPages: 0,
            totalLogs: 0,
            toggleDetailedView: false,
            logs: [],
            search: '',
            headers: [
                {text: 'Log ID', value: 'id'},
                {text: 'Action', value: 'action'},
                {text: 'Record ID', value: 'affectedRecordId'},
                {text: 'Success', value: 'success'},
                {text: 'User ID', value: 'userId'},
                {text: 'Username', value: 'userName'}
            ],
            pageSizeList: [
                '15', '25', '35', '55'
            ]
         
        }
            
    },
    methods: {
        getLogs() {
            this.$store.commit("loading", true);
            ApiDriver.Log.viewLogs(this.pageNumber, parseInt(this.selectedPageSize),10).then((response) => {
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data)
                    this.totalLogs = data.data.totalElements;
                    this.pagination.totalItems = this.totalLogs;
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
        populateData(data){
            console.log(data)
            for (var index in data.content) {
                let log = data.content[index];
                if (!log.userId) {
                    log.userId = 'N/A';
                    log.userName = 'N/A';
                    
                }
                if(!log.affectedRecordId){
                    log.affectedRecordId = 'N/A';
                }
                if(log.userFirstName && log.userLastName){
                    log.userName = log.userFirstName + ' ' + log.userLastName;
                }
                else{
                    log.userName = "No User Logged In"
                }
                this.logs.push(log);
                if(!log.success){
                    ApiDriver.Log.retrieveErrors(log.id).then((response) => {
                        HttpResponse.then(response, (data) => {
                        log.errors = data.data;
                    })
                }, (status, errors) => {
                        // Access Denied
                        if (parseInt(status) === 403) {
                            // Call the generic access denied handler
                            HttpResponse.accessDenied(this);
                        } 
                        // Invalid Resource Id
                        else if (parseInt(status) === 404) {
                            // Call the generic not found handler
                            HttpResponse.notFound(this, errors);
                        }
                    });
                }
            }
            this.numPages = data.totalPages;
        },
        next(page) {
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.logs = [];
            this.getLogs();
        },
        pageSizeUpdate(){
            this.logs = []
            this.getLogs()
        },
        changeSort (column) {
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
        },
        toggleDetails (event) {
            this.currentLog = event;
            this.currentLog.timestamp = moment(this.currentLog.timestamp).format('MMMM Do YYYY, h:mm:ss a');
            this.toggleDetailedView = !this.toggleDetailedView
        }
        
    },
    mounted: function(){
        this.getLogs()
    },
    components: {
        Loading
    }
}
</script>
<style scoped>
    .transparent {
        background-color: transparent!important;
        border-color: transparent!important;
    }
    .card-style {
        padding: 10px;
    }
</style>

