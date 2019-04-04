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
  </v-expansion-panel>-->
  <div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading">
      <v-layout row>
        <v-text-field
          v-model="searchParam"
          v-on:keyup.enter="handleSearch"
          clearable
          class="ml-2 mr-2"
          label="Search..."
          append-icon="search"
          dark
        ></v-text-field>
        <v-btn @click="reset" class="mt-3 mr-0">Clear</v-btn>
        <v-btn @click="handleSearch" class="mt-3 mr-2">Search</v-btn>
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
            <th class="text-xs-left" v-for="header in props.headers" :key="header.text">
              <h2>{{ header.text }}</h2>
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr
            @click="updateForm(props.item.name, props.item.id, props.item.declination, props.item.hours, props.item.minutes, props.item.seconds)"
          >
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.declination }}</td>
            <td class="text-xs-left">{{ props.item.hours }}</td>
            <td class="text-xs-left">{{ props.item.minutes }}</td>
            <td class="text-xs-left">{{ props.item.seconds }}</td>
          </tr>
        </template>
        <template slot="footer"></template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
      <create-celestial-body
        :isUpdate="isUpdate"
        :updateFormVals="updateFormVals"
        v-on:sendValues="updateBodies($event)"
        v-model="openForm"
      ></create-celestial-body>
      <v-container dark>
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
    </v-card>
  </div>
</template>
<script>
import router from "../../router";
import ApiDriver from "../../ApiDriver";
import HttpResponse from "../../utils/HttpResponse";
import CurrentUserValidation from "../../utils/CurrentUserValidation";
import Loading from "../../components/utility/Loading";
import CreateCelestialBody from "../../components/CreateCelestialBody.vue";
import CustomErrorHandler from "../../utils/CustomErrorHandler.js";
export default {
  name: "CelestialBodies",
  data() {
    return {
      updateFormVals: {
        name: "",
        hour: "",
        min: "",
        sec: "",
        dec: "",
        id: ""
      },
      openForm: false,
      success: true,
      callCreate: false,
      isUpdate: false,
      data: {},
      bodies: [],
      //pagination variables
      pageNumber: 0,
      pageDisplay: 1,
      numPages: 0,
      selectedPageSize: "10",
      pageSizeList: ["10", "20", "50", "100"],
      //seach vars
      searchParam: "",
      filterTypes: ["name"],
      chosenFilters: [],
      filteredSet: false,

      //table data
      search: "",
      pagination: {
        sortBy: "name",
        totalItems: 0,
        page: 1,
        rowsPerPage: 100
      },
      headers: [
        { text: "Celestial Body", value: "name" },
        { text: "Id", value: "id" },
        { text: "Declination", value: "declination" },
        { text: "Hours", value: "hours" },
        { text: "Minutes", value: "minutes" },
        { text: "Seconds", value: "seconds" }
      ]
    };
  },
  methods: {
    searchBodies(pageNumber) {
      this.bodies = [];
      console.log("search Param val: " + this.searchParam);
      this.$store.commit("loading", true);
      ApiDriver.CelestialBodies.searchCB(
        pageNumber,
        this.selectedPageSize,
        this.searchParam,
        "name"
      )
        .then(response => {
          HttpResponse.then(
            response,
            data => {
              console.log(response);
              this.populateData(data.data);
              this.$store.commit("loading", false);
            },
            (status, errors) => {}
          );
        })
        .catch(error => {
          this.$swal({
            title: '<span style="color:#f0ead6">Error!<span>',
            html:
              '<span style="color:#f0ead6">An error occurred when loading the list of users<span>',
            type: "error",
            background: "#302f2f"
          }).then(response => {
            CurrentUserValidation.validateCurrentUser(this.$store);
          });
        });
    },
    handleSearch() {
      this.filteredSet = true;
      this.searchBodies(0);
    },
    reset() {
      //clear selected filters
      (this.chosenFilters = []), (this.searchParam = ""), (this.pageNumber = 0);
      this.pageDisplay = 1;
      this.getCelestialBodies();
    },
    getCelestialBodies() {
      this.filteredSet = false;
      this.bodies = [];
      this.$store.commit("loading", true);
      ApiDriver.CelestialBodies.getCBList(
        this.pageNumber,
        this.selectedPageSize
      )
        .then(response => {
          HttpResponse.then(
            response,
            data => {
              console.log(data.data);
              this.populateData(data.data);
              this.$store.commit("loading", false);
            },
            (status, errors) => {}
          );
        })
        .catch(error => {
          console.log(errors);
          this.$swal({
            title: '<span style="color:#f0ead6">Error!<span>',
            html:
              '<span style="color:#f0ead6">An error occurred when loading the celestial bodies list<span>',
            type: "error",
            background: "#302f2f"
          }).then(response => {
            CurrentUserValidation.validateCurrentUser(this.$store);
          });
        });
    },
    populateData(data) {
      // console.log(data.content[0])
      for (var index in data.content) {
        let body = data.content[index];
        this.bodies.push(body);
      }
      this.numPages = data.totalPages;
      //console.log(this.array)
    },
    next(page) {
      // Handle retrieving a new page of information
      this.pageNumber = page - 1;
      this.pageDisplay = page;
      this.bodies = [];
      if (!this.filteredSet) {
        this.getCelestialBodies();
      } else {
        this.searchBodies(this.pageNumber);
      }
    },
    pageSizeUpdate() {
      this.bodies = [];
      if (this.filteredSet) {
        this.searchBodies(this.pageNumber);
      } else {
        this.getCelestialBodies();
      }
    },
    updateForm(name, id, dec, hours, min, sec) {
      console.log("this is the CB id" + id);
      this.isUpdate = !this.isUpdate;
      this.updateFormVals.name = name;
      if (dec){
        this.updateFormVals.dec = dec;  
      }
      else {
        this.updateFormVals.dec = "-"
      }
      if (hours){
        this.updateFormVals.hour = hours;  
      }
      else {
        this.updateFormVals.hour = "-"
      }
      if (min){
        this.updateFormVals.min = min;  
      }
      else {
        this.updateFormVals.min = "-"
      }
      if (sec){
        this.updateFormVals.sec = sec;  
      }
      else {
        this.updateFormVals.sec = "-"
      }
      this.updateFormVals.id = id;
    },
    updateBodies: function() {
      console.log(this.bodies);
      this.getCelestialBodies();
    }
  },
  mounted: function() {
    this.getCelestialBodies();
    //this.searchBodies();
    //this.create();
  },
  components: {
    Loading,
    CreateCelestialBody
  }
};
</script>
<style scoped>
</style>