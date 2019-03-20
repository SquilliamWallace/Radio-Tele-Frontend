<template dark>
<div>
    <!-- 
        Render the Navigation bar at the top of the page, and show the loading component
        while the page renders
    -->
    <navigation-bar></navigation-bar>
    <loading v-if="$store.state.isLoading"></loading>
    
    <!-- 
        Beginning of the search modal, which is only rendered if the page is not loading
    -->
    <v-card v-if="!$store.state.isLoading" width = "100%">
        <!-- 
            Display the name of the page at the top of the page
        -->
        <h1 justify-center>{{this.name}}</h1>
        
        <v-layout row >
            <!-- 
                Render a text box to search

                v-on:keyup.enter="formatSearchParams" {
                    Calls the formatSearchParams() button when the enter
                    key is released (i.e pressed and then released)
                }

                clearable : Creates an X on the text box that allows the user
                to clear their input instantly

                v-model="searchParam" {
                    Binds the entered input on the text box to the searchParam variable
                }

             -->
            <v-text-field v-on:keyup.enter="formatSearchParams" clearable v-model = "searchParam" class="ml-2 mr-2" label="Search..." append-icon="search" dark></v-text-field>

        <!-- Render a drop down menu with the available filters -->
        <v-flex xs12 sm4>    
            <v-select
            v-model="chosenFilters"
            :items="filterTypes"
            :menu-props="{ maxHeight: '400' }"
            label="Filters"
            multiple
            clearable
            hint="Select Filters"
            persistent-hint
            ></v-select>
        </v-flex>
        
        <!-- 
            Clear and Search buttons, which call the corresponding 
            reset() and formatSearchParams() methods below
        -->
        <v-btn @click="reset" class="mt-3 mr-0">Clear</v-btn> 
        <v-btn @click="formatSearchParams" class="mt-3 mr-2">Search</v-btn> 
        </v-layout>

        <!-- 
            Beginning of search results
        -->
        <v-list v-if="appts !== []">
            <v-list-tile class="list-item" v-for="appt in appts" :key = "appt.id" v-bind:href="'/#/appointments/' + appt.id + '/view'">
                <v-list-tile-content> 
                    <v-list-tile-title>
                        Appointment #{{ appt.id }}: {{appt.userFirstName}} {{appt.userLastName}}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        Start Time: {{ appt.startTime }} 
                        End Time: {{ appt.endTime }}
                        <v-spacer></v-spacer>    
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
    
    <!-- 
        Beginning of Pagination

        Conditionally rendered if $store.state.isLoading = false

        Top Block represents the pagination numbers themselves: {
            circle: circular buttons,
            v-model="pageDisplay": 2-way data binded to 'pageDisplay'
            :length="numPages": Number of pages = 'numPages'
            @input="next": Clicking on a page number will call the next() method
        }

        Bottom Block represents how many items are displayed per page: {
            v-model="selectedPageSize": 2 way data binded to 'selectedPageSize',
            :items="pageSizeList": list items are retrieved from 'pageSizeList'
            label="Items per page": Sets the text over the drop-down box to "Items per page",
            v-on:change="this.pageSizeUpdate": on selecting a new page size, call pageSizeUpdate()
            :total-visible
        }
    -->
        <div v-if="!$store.state.isLoading" class="text-xs-center">
            <v-pagination
            circle
            v-model="pageDisplay"
            :length="numPages"
            @input="next"
            :total-visible="15"
            ></v-pagination>
        </div>

        <v-layout v-if="!$store.state.isLoading" justify-center>
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
</template>

<script>
import NavigationBar from '../../components/utility/NavigationBar.vue'
import Loading from "../../components/utility/Loading"
import ApiDriver from '../../ApiDriver'
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import HttpResponse from '../../utils/HttpResponse';
import moment from 'moment'

export default {
    data() {
        return {
            // Name to render at the top of the page
            name: "Search Appointments",

            // Empty array to fill with our search results
            appts: [],
            
            // Search Variables 
            chosenFilters: [],
            chosenFiltersString: '',
            filteredSet: false,
            filterTypes: ['Full Name','First Name', 'Last Name', 'Email', 'Company'],
            searchParam: '',

            // Pagination Variables
            numPages: 0,
            pageNumber: 0,
            pageDisplay: 1,
            pageSizeList: [
                '10', '25', '50', '100'
            ],
            selectedPageSize: "10"
        }
    }, 

    props: {
        
    },

    components: {
        NavigationBar,
        Loading 
    },

    methods: {
        advancedSearch(pageNumber){
            
            // Reset Appointment array   
            this.appts = [];
            
            //console.log(this.searchParam, this.chosenFiltersString);

            ApiDriver.Appointment.appointmentSearch(pageNumber, this.selectedPageSize, this.searchParam, this.chosenFiltersString).then((response) => {
                HttpResponse.then(response, data => {
                    this.populateAppts(data.data)
                    //console.log(response);
                },(status, errors) => {})
             }).catch((error) => {
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the list of appointments<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
            });
        },

        // Remove white-space from input, and convert search input to camel-case (likeThisYouGuys)
        formatSearchParams() {
            // Reset our filter string to prevent errors with subsequent calls
            this.chosenFiltersString = ''

            for(var i in this.chosenFilters){
                this.chosenFilters[i] = this.chosenFilters[i].replace(" ","")

                // Add a space and user to the appended chosenFilterString
                if (i !== 0) {
                    this.chosenFiltersString = this.chosenFiltersString + "%2B" + this.chosenFilters[i]
                }
            }
            
            this.chosenFiltersString = this.chosenFiltersString.slice(3,this.chosenFiltersString.length);
            
            // Add user to the beginning of the filter to satisfy back-end requirements
            if(this.chosenFiltersString.length != 0) {
                this.chosenFiltersString = "user" + this.chosenFiltersString;

                // Make sure that userFullName can only be selected by itself
                if(this.chosenFiltersString.includes("FullName") && this.chosenFiltersString.length > 12) {
                    this.chosenFiltersString = "userFullName";
                }
            }

            // Reset our filters array to prevent errors with subsequent calls
            this.chosenFilters = [];

            this.filteredSet = true
            this.advancedSearch(0)
        },

        // Populate this.appts array with data 
        populateAppts(data){
            for (var index in data.content) {
                //console.log(data.content[index]);
                let appt = data.content[index];
                
                appt.startTime = moment(appt.startTime).format('MM-DD-YYYY hh:mm A');
                appt.endTime = moment(appt.endTime).format('MM-DD-YYYY hh:mm A');
                this.appts.push(appt);
                this.numPages = data.totalPages;
            } 
        },

        // Clear search filters and reset pagination
        reset(){
            this.appts = [];
            this.chosenFilters = [];
            this.chosenFiltersString = '';
            this.pageNumber = 0;
            this.pageDisplay = 1;
        },
        
        // Handle retrieving a new page of information
        next(page) {
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.appts = [];
            this.unfiltered = [];
            this.filtered = [];
            this.advancedSearch(this.pageNumber);
        },

        // Update the number of items per page
         pageSizeUpdate(){
            this.appts = [];
            this.unfiltered = [];
            this.filtered = [];
            this.advancedSearch(this.pageNumber);
        },        
    },

    mounted: function() {

    }
}
</script>

<style scoped>

</style>