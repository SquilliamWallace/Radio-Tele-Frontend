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
        <h1 justify-center>Search Appointments</h1>
        
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
                        Start Time: {{ appt.startTime }}   End Time: {{ appt.endTime }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
            </v-list-tile>
        </v-list>
    </v-card>
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
        name: "Search Appointment"
        return {
            // Empty arrays to fill with our search results
            users: [],
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
            
            // Reset user and appointment arrays 
            this.users = [];     
            this.appts = [];

            // Populate users array first
            //this.getUsers();
            
            console.log(this.searchParam, this.chosenFiltersString);

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

        // Retrieve the list of users from the back-end by calling populateData, and store it in this.users
        getUsers() {
            this.filteredSet = false
            this.users = []
            this.$store.commit("loading", true);
            ApiDriver.User.allUsers(this.pageNumber,this.selectedPageSize).then((response) => {
                HttpResponse.then(response, data => {
                    this.populateUsers(data.data)
                    this.$store.commit("loading", false);
                }, (status, errors) => {})
            }).catch((error) => {
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the list of users<span>',
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
                if (i !== 0) {
                    this.chosenFiltersString = this.chosenFiltersString + "%2B" + this.chosenFilters[i]
                }
            }
            
            this.chosenFiltersString = this.chosenFiltersString.slice(3,this.chosenFiltersString.length);
            
            // Add user to the beginning of the filter to satisfy back-end requirements
            if(this.chosenFiltersString.length != 0) {
                this.chosenFiltersString = "user" + this.chosenFiltersString;
            }

            // Reset our filters array to prevent errors with subsequent calls
            this.chosenFilters = [];

            this.filteredSet = true
            this.advancedSearch(0)
        },

        // Populate this.users array with data 
        populateUsers(data){
            for (var index in data.content) {
                //console.log(data.content[index]);
                let user = data.content[index];
                this.users.push(user);
                //this.numPages = data.totalPages;
            } 
        },

        // Populate this.appts array with data 
        populateAppts(data){
            for (var index in data.content) {
                console.log(data.content[index]);
                let appt = data.content[index];
                
                appt.startTime = moment(appt.startTime).format('MM-DD-YYYY hh:mm A');
                appt.endTime = moment(appt.endTime).format('MM-DD-YYYY hh:mm A');
                this.appts.push(appt);
                //this.numPages = data.totalPages;
            } 
        },

        // Clear search filters and reset pagination
        reset(){
            this.appts = [];
            this.users = [];
            this.chosenFilters = [];
            this.chosenFiltersString = '';
            this.pageNumber = 0;
            this.pageDisplay = 1;
        }
    },
    mounted: function() {
        this.getUsers();
    }
}
</script>

<style scoped>

</style>