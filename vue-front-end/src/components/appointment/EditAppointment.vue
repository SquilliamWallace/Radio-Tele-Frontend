<!-- Same form type as Appointment.vue except all fields are already populated by the appointment data -->
<template dark>
  <v-dialog
    fullscreen
    dark
    hide-overlay
    :value="value"
    @input="$emit('input')"
    persistent
    width="50%"
  >
    <v-card flat>
      <v-card-title class="headline">Edit Appointment</v-card-title>
      <v-form ref="form" @submit.prevent="submit" refs="form">
        <v-container grid-list-xl fluid>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-date-picker v-model="appointmentObj.startDate.value" landscape width="175"></v-date-picker>
              <v-time-picker v-model="appointmentObj.startTime.value" landscape width="175"></v-time-picker>
            </v-flex>
            <v-flex xs12 sm6>
              <v-date-picker v-model="appointmentObj.endDate.value" landscape width="175"></v-date-picker>
              <v-time-picker v-model="appointmentObj.endTime.value" landscape width="175"></v-time-picker>
            </v-flex>
            
            <!-- If appointment type is POINT -->
            <v-layout class="ma-2" v-if="appointmentObj.type === 'Point'">
              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.rightAscension.hours"
                  :rules="[rules.rightAscHours]"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  label="Right Ascension Hours"
                  type="number"
                  mask="##"
                  required
                ></v-text-field>
              </v-flex>
              <!--
                Same as Right Ascension Hours, except checks for minutes error handling
              -->
              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.rightAscension.minutes"
                  :rules="[rules.rightAscMinutes]"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  label="Right Ascension Minutes"
                  type="number"
                  mask="##"
                  required
                ></v-text-field>
              </v-flex>

              <!--
                Same as Right Ascension Hours, except checks for seconds error handling
              -->
              
              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.rightAscension.seconds"
                  :rules="[rules.rightAscSeconds]"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  label="Right Ascension Seconds"
                  type="number"
                  mask="##"
                  required
                ></v-text-field>
              </v-flex>
              
              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.declination.value"
                  :rules="[rules.numRequired]"
                  :error="appointmentObj.declination.hasError"
                  :error-messages="appointmentObj.declination.errorMessage"
                  color="blue darken-2"
                  label="Declination"
                  type="number"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <!-- If appointment type is CELESTIAL BODY -->
            <v-flex v-if="appointmentObj.type === 'Celestial Body'">
              <v-autocomplete
                v-model="selectedBody"
                label="Celestial Body"
                :items="bodies"
                item-text="name"
                item-value="id"
                :search-input.sync="searchInput"
                placeholder="Enter the name of a Celestial Body"
                hide-no-data
              ></v-autocomplete>
            </v-flex>

            <!-- If appointment is DRIFT SCAN -->
            <v-layout class="ma-2" wrap v-if="appointmentObj.type === 'Drift Scan'">
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="appointmentObj.azimuth.value"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  label="Azimuth"
                  type="number"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  :rules="[rules.azimuth]"
                  required
                ></v-text-field>
              </v-flex>
              
            <v-flex xs12 sm6>
              <v-text-field
                v-model="appointmentObj.elevation.value"
                :validate-on-blur="true"
                color="blue darken-2"
                label="Elevation"
                type="number"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                :rules="[rules.elevation]"
                required
              ></v-text-field>
            </v-flex>  
            </v-layout>

            <!-- If appointment is RASTER SCAN -->
            <v-layout wrap class="ma-2" v-if="appointmentObj.type === 'Raster Scan'">
              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.coordinate1.hours"
                  :rules="[rules.rightAscHours]"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  :error-messages="appointmentObj.rightAscension.errorMessage"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  label="Coordinate 1 Hours"
                  type="number"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.coordinate1.minutes"
                  :rules="[rules.rightAscMinutes]"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  :error-messages="appointmentObj.rightAscension.errorMessage"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  label="Coordinate 1 Minutes"
                  type="number"
                  class="number"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.coordinate1.seconds"
                  :rules="[rules.rightAscSeconds]"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  :error-messages="appointmentObj.rightAscension.errorMessage"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  label="Coordinate 1 Seconds"
                  type="number"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.coordinate1.declination"
                  :rules="[rules.numRequired]"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  :error="appointmentObj.declination.hasError"
                  :error-messages="appointmentObj.declination.errorMessage"
                  onkeypress="return event.charCode == 45 || (event.charCode >= 48 && event.charCode <= 57)"
                  label="Coordinate 1 Declination"
                  type="number"
                  required
                ></v-text-field>
              </v-flex>

              <v-spacer></v-spacer>

              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.coordinate2.hours"
                  :rules="[rules.rightAscHours]"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  :error-messages="appointmentObj.rightAscension.errorMessage"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  label="Coordinate 2 Hours"
                  type="number"
                  class="number"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.coordinate2.minutes"
                  :rules="[rules.rightAscMinutes]"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  :error-messages="appointmentObj.rightAscension.errorMessage"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  label="Coordinate 2 Minutes"
                  type="number"
                  class="number"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.coordinate2.seconds"
                  :rules="[rules.rightAscSeconds]"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  :error="appointmentObj.rightAscension.hasError"
                  :error-messages="appointmentObj.rightAscension.errorMessage"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  label="Coordinate 2 Seconds"
                  type="number"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex sm3>
                <v-text-field
                  v-model="appointmentObj.coordinate2.declination"
                  :rules="[rules.numRequired]"
                  :validate-on-blur="true"
                  color="blue darken-2"
                  :error="appointmentObj.declination.hasError"
                  :error-messages="appointmentObj.declination.errorMessage"
                  onkeypress="return event.charCode == 45 || (event.charCode >= 48 && event.charCode <= 57)"
                  label="Coordinate 2 Declination"
                  type="number"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex v-if="$store.state.isResearcher | $store.state.isAdmin" xs12>
              <v-checkbox v-model="appointmentObj.privacy.value" color="green" label="Private"></v-checkbox>
              <v-checkbox v-model="appointmentObj.priority.value" color="green" label="Secondary"></v-checkbox>
            </v-flex>
            
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat @click="$emit('input')">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!validRequest" flat color="primary" type="submit">Update</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import Event from "../../main.js";
import ApiDriver from "../../ApiDriver";
import HttpResponse from "../../utils/HttpResponse";
import CurrentUserValidation from "../../utils/CurrentUserValidation";
import CustomErrorHandler from "../../utils/CustomErrorHandler.js";
export default {
  data() {
    return {
      type: "",
      startTime: "",
      startDate: "",
      endTime: "",
      endDate: "",
      start: "",
      end: "",
      form: {
        rightAscension: {
          hours: null,
          minutes: null,
          seconds: null,
          hasError: false
        }
      },
      rules: {
        dateRequired: val => (val && val.length > 0) || "Required field",
        rightAscHours: val =>
          (val && val.toString().length > 0 && val < 24 && val >= 0) ||
          "Must be between 0 and 23 hours",
        rightAscMinutes: val =>
          (val && val.toString().length > 0 && val < 60 && val >= 0) ||
          "Must be between 0 and 59 minutes",
        rightAscSeconds: val =>
          (val && val.toString().length > 0 && val < 60 && val >= 0) ||
          "Must be between 0 and 59 seconds",
        numRequired: val =>
          (val && val.toString().length > 0 && val <= 90 && val >= -90) ||
          "Must be between 90 and -90",
        azimuth: val =>
          (val && val.toString().length > 0 && val >= 0 && val < 360) ||
          "Must be between 0 and 360",
        elevation: val =>
          (val && val.toString().length > 0 && val >= 0 && val <= 90) ||
          "Must be between 0 and 90"
      },
      // Variables to keep track of chosen Celestial Body
      bodies: [],
      selectedBody: "",
      searchInput: "",
      // Variable to store our pair of coordinates for Drift Scans
      coordinates: []
    };
  },
  props: {
    appointmentObj: {},
    value: false
  },
  methods: {
    submit() {
      this.clearErrors();
      this.startDate = this.appointmentObj.startDate.value;
      this.startTime = this.appointmentObj.startTime.value;
      this.endDate = this.appointmentObj.endDate.value;
      this.endTime = this.appointmentObj.endTime.value;
      this.start = this.startDate + " " + this.startTime;
      this.end = this.endDate + " " + this.endTime;

      if(this.appointmentObj.priority.value) {
        this.appointmentObj.priority.stringValue = "Secondary";
      } else {
        this.appointmentObj.priority.stringValue = "Primary";
      }
      

      this.handleTypeConversion();

      let data = {};
      

      if (this.appointmentObj.type === "Point") {
        console.log("stringify form...");
        data = JSON.stringify({
          priority: this.appointmentObj.priority.stringValue,
          startTime: new Date(this.start).toUTCString(),
          endTime: new Date(this.end).toUTCString(),
          telescopeId: this.appointmentObj.telescopeId.value,
          isPublic: !this.appointmentObj.privacy.value,
          hours: this.appointmentObj.rightAscension.hours,
          minutes: this.appointmentObj.rightAscension.minutes,
          seconds: this.appointmentObj.rightAscension.seconds,
          declination: this.appointmentObj.declination.value
        });
      } else if (this.appointmentObj.type === "Celestial Body") {
        data = JSON.stringify({
          priority: this.appointmentObj.priority.stringValue,
          startTime: new Date(this.start).toUTCString(),
          endTime: new Date(this.end).toUTCString(),
          telescopeId: this.appointmentObj.telescopeId.value,
          isPublic: !this.appointmentObj.privacy.value,
          celestialBodyId: this.selectedBody
        });
      } else if (this.appointmentObj.type === "Drift Scan") {
        data = JSON.stringify({
          priority: this.appointmentObj.priority.stringValue,
          startTime: new Date(this.start).toUTCString(),
          endTime: new Date(this.end).toUTCString(),
          telescopeId: this.appointmentObj.telescopeId.value,
          isPublic: !this.appointmentObj.privacy.value,
          azimuth: this.appointmentObj.azimuth.value,
          elevation: this.appointmentObj.elevation.value
        });
      } else if (this.appointmentObj.type === "Raster Scan") {
        data = JSON.stringify({
          priority: this.appointmentObj.priority.stringValue,
          startTime: new Date(this.start).toUTCString(),
          endTime: new Date(this.end).toUTCString(),
          telescopeId: this.appointmentObj.telescopeId.value,
          isPublic: !this.appointmentObj.privacy.value,
          coordinates: this.coordinates
        });
      }
      // This resolves View Appointment date refresh bug
      this.appointmentObj.start.value = moment(this.start).format(
        "MM-DD-YYYY hh:mm A"
      );
      this.appointmentObj.end.value = moment(this.end).format(
        "MM-DD-YYYY hh:mm A"
      );

      ApiDriver.Appointment.update(
        this.appointmentObj.id.value,
        data,
        this.type
      ).then(response => {
        HttpResponse.then(
          response,
          data => {
            this.$emit("edited", this.appointmentObj);
            this.$emit("input");
          },
          (status, errors) => {
            if (parseInt(status) === 403) {
              HttpResponse.accessDenied(this);
            } else if (parseInt(status) === 404) {
              HttpResponse.notFound(this, errors);
            } else {
              this.handleErrors(errors);
            }
          }
        );
      });
    },
    handleErrors(errors) {
      for (var field in errors) {
        let message = errors[field][0];

        if (field === "RIGHT_ASCENSION") {
          CustomErrorHandler.populateError(
            this.appointmentObj.rightAscension,
            message
          );
        } else if (field === "DECLINATION") {
          CustomErrorHandler.populateError(
            this.appointmentObj.declination,
            message
          );
        } else if (field === "START_TIME") {
          CustomErrorHandler.populateError(this.appointmentObj.start, message);
        } else if (field === "END_TIME") {
          CustomErrorHandler.populateError(this.appointmentObj.end, message);
        } else {
          HttpResponse.generalError(this, message, false);
        }
      }
    },
    clearErrors() {
      CustomErrorHandler.clearError(this.appointmentObj.rightAscension);
      CustomErrorHandler.clearError(this.appointmentObj.declination);
      CustomErrorHandler.clearError(this.appointmentObj.start);
      CustomErrorHandler.clearError(this.appointmentObj.end);
    },
    handleTypeConversion() {
      this.coordinates = [];
      if (this.appointmentObj.type === "Point") {
        this.type = "coordinate";
      } else if (this.appointmentObj.type === "Celestial Body") {
        this.type = "celestial-body";
      } else if (this.appointmentObj.type === "Drift Scan") {
        this.type = "drift-scan";
      } else if (this.appointmentObj.type === "Raster Scan") {
        this.type = "raster-scan";
        // Add the two sets of coordinates to a single array to send to the back-end
        this.coordinates.push(this.appointmentObj.coordinate1);
        this.coordinates.push(this.appointmentObj.coordinate2);
        console.log("Raster Coordinates from edit: " + JSON.stringify(this.coordinates))
      }
    },
    // Methods to grab our celestial bodies and push them into the bodies[] list
    getCelestialBodies(searchParam) {
      this.bodies = [];
      this.$store.commit("loading", true);
      ApiDriver.CelestialBodies.searchCB(0, 25, searchParam, "name")
        .then(response => {
          HttpResponse.then(
            response,
            data => {
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
              '<span style="color:#f0ead6">An error occurred when loading the celestial bodies list<span>',
            type: "error",
            background: "#302f2f"
          }).then(response => {
            CurrentUserValidation.validateCurrentUser(this.$store);
          });
        });
    },
    populateData(data) {
      for (var index in data.content) {
        let body = data.content[index];
        this.bodies.push(body);
      }
    }
  },
  computed: {
    validRequest() {
      
        if(this.appointmentObj.type === 'Point'){
            return(
                this.appointmentObj.rightAscension.hours &&
                this.appointmentObj.rightAscension.minutes &&
                this.appointmentObj.rightAscension.seconds &&
                this.appointmentObj.declination.value &&
                this.appointmentObj.start.value &&
                this.appointmentObj.end.value 
            )
        }else if(this.appointmentObj.type === 'Celestial Body'){
            return(
                this.selectedBody &&
                this.appointmentObj.start.value &&
                this.appointmentObj.end.value 
            )
        }else if(this.appointmentObj.type === 'Raster Scan'){
            return(
                this.appointmentObj.coordinate1.hours &&
                this.appointmentObj.coordinate1.minutes &&
                this.appointmentObj.coordinate1.seconds &&
                this.appointmentObj.coordinate1.declination &&

                this.appointmentObj.coordinate2.hours &&
                this.appointmentObj.coordinate2.minutes &&
                this.appointmentObj.coordinate2.seconds &&
                this.appointmentObj.coordinate2.declination &&

                this.appointmentObj.start.value &&
                this.appointmentObj.end.value 
            )
        }else if(this.appointmentObj.type === 'Drift Scan'){
            return(
                this.appointmentObj.elevation.value &&
                this.appointmentObj.azimuth.value &&
                this.appointmentObj.start.value &&
                this.appointmentObj.end.value 
            )
        }
    }
  },
  watch: {
    searchInput(key) {
      this.getCelestialBodies(key);
    }
  }
};
</script>
<style scoped>
</style>
