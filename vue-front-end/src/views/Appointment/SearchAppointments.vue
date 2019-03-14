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
            <v-text-field  v-on:keyup.enter="formatSearchParams" v-on:keyup.down="reset" clearable v-model = "searchParam" class="ml-2 mr-2" label="Search..." append-icon="search" dark></v-text-field>

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

export default {
    data() {
        name: "Search Appointment"
        return {
            ////////////////////////
            /// Search Variables ///
            ////////////////////////
            chosenFilters: [],
            searchParam: '',
            filterTypes: ['Full Name', 'First Name', 'Last Name', 'Email', 'Company'],
            chosenFiltersString: '',
            filteredSet: false
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
            
            
            //console.log(this.chosenFiltersString,this.searchParam)
            
            ApiDriver.User.userSearch(pageNumber, this.selectedPageSize, this.searchParam, this.chosenFiltersString).then((response) => {
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
                            CurrentUserValidation.validateCurrentUser(this.$store);
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