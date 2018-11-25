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
        <td :colspan="headers.length">
          <v-pagination
            circle
            v-model="pageDisplay"
            :length="numPages"
            @input = "next"
            :total-visible="7"
            ></v-pagination>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
      </v-alert>  
    </v-data-table>
    </v-card>
    </div>
</template>
<script>
import router from '../router';
import ApiDriver from '../ApiDriver';
import HttpResponse from '../utils/HttpResponse';
import CurrentUserValidation from  '../utils/CurrentUserValidation';
import Loading from "../components/Loading"
export default {
    name: 'AdminLog',
    data() {
        return {
            pagination: {
                sortBy: 'name',
                totalItems: 0,
                page: 1,
                rowsPerPage: 25
            },
            pageNumber: 0,
            pageSize: 25,
            pageDisplay: 1,
            numPages: 0,
            totalLogs: 0,
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
         
        }
            
    },
    methods: {
        getLogs() {
            this.$store.commit("loading", true);
            ApiDriver.Log.viewLogs(this.pageNumber, this.pageSize).then((response) => {
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
            for (var index in data.content) {
                let log = data.content[index];
                if (!log.userId) {
                    log.userId = 'N/a';
                    log.userName = 'N/a';
                    
                }
                if(!log.affectedRecordId){
                    log.affectedRecordId = 'N/a';
                }
                log.userName = log.userFirstName + ' ' + log.userLastName;
                this.logs.push(log);
                
            }
            this.numPages = data.totalPages;
        },
        next(page) {
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.logs = [];
            this.getLogs();
        },
        changeSort (column) {
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
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
</style>

