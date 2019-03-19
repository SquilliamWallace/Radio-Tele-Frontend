<template>        
  <!-- <v-expansion-panel>
    <v-expansion-panel-content v-for="body in bodies" :key="body.id">
      <h3 slot="header">{{body.name}}</h3>
      
      <v-card class="px-5" @click="">
          <v-layout row>
                <v-card-text>
                    Id: {{body.id}}
                </v-card-text>
                <v-card-text>
                    Declination: {{body.declination}}
                </v-card-text>
                <v-card-text>
                    Hours: {{body.hours}}
                </v-card-text>
                <v-card-text>
                    Minutes: {{body.minutes}}
                </v-card-text>
                <v-card-text>
                    Seconds: {{body.seconds}}
                </v-card-text>
          </v-layout>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel> -->
    <div>
        <loading v-if="$store.state.isLoading"></loading>
        <v-card v-if="!$store.state.isLoading">
            <v-layout row >
                <v-text-field clearable class="ml-2 mr-2" label="Search..." append-icon="search" dark></v-text-field>
                    <!-- <v-select
                    :items="filterTypes"
                    label="Filter by"
                    v-model="filterType"
                    ></v-select>
                    -->
                <v-flex xs12 sm4>    
                    <v-select
                    
                    
                    :menu-props="{ maxHeight: '400' }"
                    label="Filters"
                    multiple
                    clearable
                    hint="Select Filters"
                    persistent-hint
                    ></v-select>
                </v-flex>
                <v-btn @click="" class="mt-3 mr-0">Clear</v-btn> 
                <v-btn @click="" class="mt-3 mr-2">Search</v-btn>      
            </v-layout>

            <v-data-table
        v-if="!$store.state.isLoading"
        hide-actions
        :headers="headers"
        :items="bodies"
        :pagination.sync="pagination"
        select-all
        class="elevation-1"
        >
        <template slot="headers" slot-scope="props">
            <tr>
            <th
                class="text-xs-left"
                v-for="header in props.headers"
                :key="header.text">
                <h2>{{ header.text }}</h2>
                
            </th>
            </tr>
        </template>
        <template slot="items" slot-scope="props">
            <tr @click="updateForm(props.item.name, props.item.id, props.item.declination, props.item.hours, props.item.minutes, props.item.seconds)">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.declination }}</td>
            <td class="text-xs-left">{{ props.item.hours }}</td>
            <td class="text-xs-left">{{ props.item.minutes }}</td>
            <td class="text-xs-left">{{ props.item.seconds }}</td>
            </tr>
        </template>
        <template slot="footer">
            
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>  
        </v-data-table> 
        <create-celestial-body :success="success" :formErrors="form" v-on:resetForm="resetForm($event)" v-on:sendValues="recieveValues($event)"></create-celestial-body>
        </v-card>
        <v-container>
            <div class="text-xs-center">
                <v-pagination
                    circle
                    v-model="pageDisplay"
                    :length="numPages"
                    :total-visible="7"
                    @input="next"
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
            </div>
        </v-container> 
    </div>
 


</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading"
import CreateCelestialBody from '../../components/CreateCelestialBody.vue'
import CustomErrorHandler from '../../utils/CustomErrorHandler.js';
export default {
    name: 'CelestialBodies',
    data(){
        return{
            form: {
                name: {
                   value: "",
                   hasError: false,
                   errorMsg: ""
               },
               hours:{
                   value: '',
                   hasError: false,
                   errorMsg: ""
               },
               minutes:{
                   value: '',
                   hasError: false,
                   errorMsg: ""
               },
               seconds:{
                   value: '',
                   hasError: false,
                   errorMsg: ""
               },
               declination:{
                   value: '',
                   hasError: false,
                   errorMsg: ""
               }
            },
            errorsList: {
                name: "",
                hour: "",
                min: "",
                sec: "",
                dec: ""
            },
            success: true,
            data: {
               
            },
            bodies: [],
            //pagination variables
            pageNumber: 0,
            pageDisplay: 1,
            numPages: 0,
            selectedPageSize: "10",
            pageSizeList: [
                '10', '20', '50', '100'
            ],

            //table data
            search: '',
             pagination: {
                sortBy: 'name',
                totalItems: 0,
                page: 1,
                rowsPerPage: 100
            },
            headers: [
            {text: 'Celestial Body', value: 'name'},
            { text: 'Id', value: 'id' },
            { text: 'Declination', value: 'declination' },
            { text: 'Hours', value: 'hours' },
            { text: 'Minutes', value: 'minutes' },
            { text: 'Seconds', value: 'seconds' }
        ],
             
        }
    },
    methods: {
        create(){
            let data = JSON.stringify({
                name: this.form.name.value,
                hours: this.form.hours.value,
                minutes: this.form.minutes.value,
                seconds: this.form.seconds.value,
                declination: this.form.declination.value
            })

            ApiDriver.CelestialBodies.createCB(data).then((response) => {
                let that = this;
               HttpResponse.then(response, data => {
                    //this.$store.commit("loading", false);
                    if(data.statusCode === "200"){
                        success = true
                    }
                },(status, errors) => {
                    //Populates error message for form, clears form if no errors are fixed
                    if(errors.DECLINATION){
                        this.form.declination.hasError = true
                        for(var index in errors.DECLINATION){
                            this.form.declination.errorMsg = this.form.declination.errorMsg + errors.DECLINATION[index] + "\n"
                        }
                    } else{this.form.declination.errorMsg = ""}
                    if(errors.HOURS){
                        this.form.hours.hasError = true
                        for(var index in errors.HOURS){
                            this.form.hours.errorMsg = this.form.hours.errorMsg + errors.HOURS[index] + "\n"
                        }
                    } else{this.form.hours.errorMsg = ""}
                    if(errors.MINUTES){
                        this.form.minutes.hasError = true
                        for(var index in errors.MINUTES){
                            this.form.minutes.errorMsg = this.form.minutes.errorMsg + errors.MINUTES[index] + "\n"
                        }
                    } else{this.form.minutes.errorMsg = ""}
                    if(errors.SECONDS){
                        this.form.seconds.hasError = true
                        for(var index in errors.SECONDS){
                            this.form.seconds.errorMsg = this.form.seconds.errorMsg + errors.SECONDS[index] + "\n"
                        }
                    } else{this.form.seconds.errorMsg = ""}
                    if(errors.NAME){
                        this.form.name.hasError = true
                        for(var index in errors.NAME){
                            this.form.name.errorMsg = this.form.name.errorMsg + errors.NAME[index] + "\n"
                        }
                    } else{this.form.name.errorMsg = ""}
                    console.log(errors)
                    that.handleErrors(errors)
                }) 
            }).catch((error) => {
                console.log(error)
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the celestial bodies list<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
            });
            this.success = false
        },
        getCelestialBodies(){
            this.$store.commit("loading", true);
             ApiDriver.CelestialBodies.getCBList(this.pageNumber,this.selectedPageSize).then((response) => {
                HttpResponse.then(response, data => {
                    console.log(data.data)
                    this.populateData(data.data)
                    this.$store.commit("loading", false);
                },(status, errors) => {})
             }).catch((error) => {
                 console.log(errors)
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the celestial bodies list<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
            });
        },
        populateData(data){
           // console.log(data.content[0])
            for (var index in data.content) {
                let body = data.content[index];
                this.bodies.push(body);
            }
            this.numPages = data.totalPages;
            //console.log(this.array)   
        },
        handleErrors(errors) {
          // Populate the field error messages
          for (var field in errors) {
              let message = errors[field][0];

              if (field === "NAME") {
                  CustomErrorHandler.populateError(this.form.name, message);
              } else if (field === "HOURS") {
                  CustomErrorHandler.populateError(this.form.hours, message);
              } else if (field === "MINUTES") {
                  CustomErrorHandler.populateError(this.form.minutes, message);
              } else if (field === "SECONDS") {
                  CustomErrorHandler.populateError(this.form.seconds, message);
              }else if (field === "DECLINATION") {
                  CustomErrorHandler.populateError(this.form.declination, message);
              }  
          }
      },
      clearErrors() {
          // Clear all error fields
          CustomErrorHandler.clearError(this.form.name);
          CustomErrorHandler.clearError(this.form.declination);
          CustomErrorHandler.clearError(this.form.hours);
          CustomErrorHandler.clearError(this.form.minutes);
          CustomErrorHandler.clearError(this.form.seconds);
      },
        next(page) {
            // Handle retrieving a new page of information
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.bodies = [];
            this.getCelestialBodies();
        },
        pageSizeUpdate(){
            this.bodies = []
            this.getCelestialBodies()
        },
        recieveValues: function(vals){
            this.form.name.value = vals.name
            this.form.declination.value = vals.dec
            this.form.hours.value = vals.hour
            this.form.minutes.value = vals.min
            this.form.seconds.value = vals.sec

            
            this.create()
        },
        updateForm(name,id,dec,hours,min,sec,){
            console.log(name)
        },
        resetForm: function(){

            this.clearErrors()

            this.form.name.value = ""
            this.form.name.hasError = false
            console.log("this is the name after clear: " + this.form.name.value)
            this.form.declination.value = ""
            this.form.declination.hasError = false

            this.form.hours.value = ""
            this.form.hours.hasError = false

            this.form.minutes.value = ""
            this.form.minutes.hasError = false

            this.form.seconds.value = ""
            this.form.seconds.hasError = false
        },
    },
    mounted: function(){
        this.getCelestialBodies();
        //this.create();
    },
    components: {
        Loading,
        CreateCelestialBody
    }
}
</script>
<style scoped>

</style>