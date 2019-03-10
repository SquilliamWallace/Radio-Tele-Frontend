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
    <v-card>
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
        <tr>
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
    </v-card>
 


</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading"
export default {
    name: 'CelestialBodies',
    data(){
        return{
            data: {
               
            },
            bodies: [],
            array:[],

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
        getCelestialBodies(){
             ApiDriver.CelestialBodies.getCBList(0,10).then((response) => {
                HttpResponse.then(response, data => {
                    console.log(data.data)
                    this.populateData(data.data)
                },(status, errors) => {})
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
        },
        populateData(data){
           // console.log(data.content[0])
            for (var index in data.content) {
                let body = data.content[index];
                this.bodies.push(body);
                this.array.push(
                    {name: data.content[index].name, items:[ 
                        {val: data.content[index].id, title:'Id'}, 
                        {val: data.content[index].declination, title:'Declination'}, 
                        {val: data.content[index].hours, title:'Hours'}, 
                        {val: data.content[index].minutes, title:'Minutes'}, 
                        {val: data.content[index].seconds, title:'Seconds'} ]})
                //this.numPages = data.totalPages;
            }
            //console.log(this.array)   
        },
    },
    mounted: function(){
        this.getCelestialBodies();
    },
}
</script>
<style scoped>

</style>