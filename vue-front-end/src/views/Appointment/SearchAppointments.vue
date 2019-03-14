<template dark>
<div>
    <!-- 
        Render the Navigation bar at the top of the page, and show the loading component
        while the page renders
    -->
    <navigation-bar></navigation-bar>
    <loading v-if="$store.state.isLoading"></loading>

    <v-card v-if="!$store.state.isLoading" width = "100%">
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
    </v-card>
</div>
</template>

<script>
import NavigationBar from '../../components/utility/NavigationBar.vue'
import Loading from "../../components/utility/Loading"
import ApiDriver from '../../ApiDriver'
import CurrentUserValidation from  '../../utils/CurrentUserValidation';

export default {
    data() {
        name: "Search Appointment"
        return {
            // Search Variables 
            chosenFilters: [],
            chosenFiltersString: '',
            filteredSet: false,
            filterTypes: ['First Name', 'Last Name', 'Email', 'Company'],
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
            
            this.users = []
            //Takes chosenFilters array and sets it to a string with the format "firstName+lastName..."
            //also sets the values in the array to camel case
            
            
            console.log(this.chosenFiltersString,this.searchParam)
            
            ApiDriver.Appointment.appointmentSearch(pageNumber, this.selectedPageSize, this.searchParam, this.chosenFiltersString).then((response) => {
                HttpResponse.then(response, data => {
                    this.populateData(data.data)
                },(status, errors) => {})
             }).catch((error) => {
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the list of users<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            //CurrentUserValidation.validateCurrentUser(this.$store);
                        });
            });
        },
        formatSearchParams(){
            for(var i in this.chosenFilters){
                this.chosenFilters[i] = this.chosenFilters[i].replace(" ","")
                this.chosenFilters[i] = this.chosenFilters[i].charAt(0).toLowerCase() + this.chosenFilters[i].slice(1,this.chosenFilters[i].length)
                if (i !== 0) {
                    this.chosenFiltersString = this.chosenFiltersString + "%2B" + this.chosenFilters[i]
                }
            }
            this.chosenFiltersString = this.chosenFiltersString.slice(3,this.chosenFiltersString.length)
            this.filteredSet = true
            this.advancedSearch(0)
        },
        reset(){
            // Clear search filters and reset pagination
            this.chosenFilters = [];
            this.pageNumber = 0;
            this.pageDisplay = 1;
        }
    },
    mounted: function() {
        //console.log("test");
    }
}
</script>

<style scoped>

</style>