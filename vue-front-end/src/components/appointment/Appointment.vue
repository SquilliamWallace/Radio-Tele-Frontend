<template>
    <!-- 
        Define the v-dialog that will pop up when an appointment is being created

        @keydown.esc="resetForm" {
            Allows the user to close the modal with the escape key, by calling the resetForm method below
        } 
        :value="value" {
            Boolean passed from Appointment.vue's parent, Scheduler.vue,
            this.value = false when the component is closed, true when it's open
        }
        @input="$emit('input') {
            Emits 'input' back to the parent component (Scheduler.vue)
        }
    -->
    <v-dialog fullscreen dark hide-overlay @keydown.esc="resetForm" :value="value" @input="$emit('input')" persistent width="50%">
            <v-card flat>
                <v-card-title class="headline">Schedule Appointment</v-card-title>
                <v-snackbar
                v-model="snackbar"
                absolute
                top
                right
                color="success">
                <span>Appointment Created</span>
                <v-icon dark>check_circle</v-icon>
                </v-snackbar>
                <v-form ref="form" @submit.prevent="submit" refs="form">
                <v-container grid-list-xl fluid>
                    <v-layout wrap>
                    <!--
                        Start Time text box input
                        v-model="eventObj.start"
                            Bind the data of this input field with eventObj.start
                            which is passed in as a prop so will display the data automatically but allow for editing if they
                            selected the time slot wrong.
                        :rules="[rules.dateRequired]"
                            Makes sure that their is input in the start date field
                    -->
                    <!-- <v-flex xs12 sm6>
                        <v-text-field
                        v-model="eventObj.start"
                        :rules="[rules.dateRequired]"
                        color="blue darken-2"
                        label="Start Time"
                        required
                        ></v-text-field>
                    </v-flex> -->
                    <v-flex xs12 sm6>
                        <div class="title-style">Start Date/Time</div>
                        <v-date-picker
                        v-model="startDate"
                        landscape
                        width="175"
                        ></v-date-picker>
                        <v-time-picker
                        v-model="startTime"
                        landscape
                        width="175"
                        v-on:update:period="captureStartPeriod($event)"
                        ></v-time-picker>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <div class="title-style">End Date/Time</div>
                        <v-date-picker
                        v-model="endDate"
                        landscape
                        width="175"
                        ></v-date-picker>
                        <v-time-picker
                        v-model="endTime"
                        landscape
                        width="175"
                        ></v-time-picker>
                    </v-flex>
                    <!--
                        Same as Start Time above
                    -->
                    <!--
                        Right Ascension Hours
                        v-model="form.rightAscension.hours"
                            Bind the data of this input field with form.rightAscension.hours
                        :rules="[rules.rightAscHours]"
                            Makes sure that the input here is between 0 and 24
                        :error = form.rightAscension.hasError
                            This is a boolean decleration to display or not display the error messages
                        :error-messages= form.rightAscension.errorMessage
                            This displays any text inside form.rightAscension.errorMessage if :error=true
                            errorMessage is handled on backend and sent back to front end. 
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                            Only allow numbers to be inputted into the form (0 through 9)
                    -->
                    <v-flex xs12 sm6>
                        <v-select
                        v-model="telescopeName"
                        :items="telescopes"
                        color="blue darken-2"
                        label="Telescope"
                        required
                        ></v-select>
                    </v-flex>
                    
                    <v-flex xs12 sm6>
                        <v-select
                        v-model="type"
                        :items="types"
                        color="blue darken-2"
                        label="Appointment Type"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm3 v-if="type === 'Point'">
                        <v-text-field
                        v-model="form.rightAscension.hours"
                        :rules="[rules.rightAscHours]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Right Ascension Hours"
                        type="number"
                        class="number"
                        required
                        ></v-text-field>
                    </v-flex>
                     <!--
                        Same as Right Ascension Hours, except checks for minutes error handling
                    -->
                    <v-flex xs12 sm3 v-if="type === 'Point'">
                        <v-text-field
                        v-model="form.rightAscension.minutes"
                        :rules="[rules.rightAscMinutes]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Right Ascension Minutes"
                        type="number"
                        class="number"
                        required
                        ></v-text-field>
                     </v-flex>
                     <!--
                        Same as Right Ascension Hours, except checks for seconds error handling
                    -->
                    <v-flex xs12 sm3 v-if="type === 'Point'">
                        <v-text-field
                        v-model="form.rightAscension.seconds"
                        :rules="[rules.rightAscSeconds]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Right Ascension Seconds"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                     <!-- Pretty much same as Right Ascension 
                     
                        onkeypress='return event.charCode == 45 || (event.charCode >= 48 && event.charCode <= 57)'
                            Only allow numerical inputs and - (minus) as input can be negative
                     -->
                    <v-flex xs12 sm3 v-if="type === 'Point'">
                        <v-text-field
                        v-model="form.declination.value"
                        :rules="[rules.numRequired]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.declination.hasError
                        :error-messages=form.declination.errorMessage
                        onkeypress='return event.charCode == 45 || (event.charCode >= 48 && event.charCode <= 57)'
                        label="Declination"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>

                    <!-- [Celestial Body]
                        Conditionally display Celestial Body Selection field  

                        :items="bodies", item-text="name", item-value="id" {
                            Sets the items in the list to the items in the bodies object,
                            makes the text that appear in the selection the value of bodies.name,
                            and sets the variable bound to the model (selectedBody) to bodies.id
                        } 
                        :search-input.sync="searchInput" {
                            Sets the searchInput variable to the text the user types. This is monitored
                            with a watcher below, and calls the getCelestialBodies method whenever a user
                            enters text (i.e. autocomplete)
                        }
                        placeholder="..." {
                            Sets the placeholder text in the text box to the text inside of the quotes.
                        }  
                        hide-no-data {
                            Prevents an ugly popup from showing when the user hasn't entered in any text.
                        }
                    -->
                    <v-flex xs12 sm6 v-if="type === 'Celestial Body'">
                        <v-autocomplete
                        v-model="selectedBody"
                        label="Celestial Body"
                        :items="bodies"
                        item-text="name"
                        item-value="id"
                        :search-input.sync="searchInput"
                        placeholder="Enter the name of a Celestial Body"
                        hide-no-data>
                        </v-autocomplete>
                     </v-flex>

                    <!-- [Drift Scan]
                        Conditionally display Azimuth and Elevation fields
                    -->
                    <v-flex xs12 sm6 v-if="type === 'Drift Scan'">
                        <v-text-field
                        v-model="form.azimuth.value"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        label="Azimuth"
                        type="number"
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        :rules="[rules.azimuth]"
                        required
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 v-if="type === 'Drift Scan'">
                        <v-text-field
                        v-model="form.elevation.value"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        label="Elevation"
                        type="number"
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        :rules="[rules.elevation]"
                        required
                        ></v-text-field>
                    </v-flex>

                    <!-- [Raster Scan]
                        Conditionally display two sets of Coordinate fields
                        (Hours, Minutes, Seconds, Right Ascension, Declination)
                    -->
                        <v-flex xs12 sm2 row v-if="type === 'Raster Scan'">
                        <v-text-field
                        v-model="form.firstCoordinate.hours"
                        :rules="[rules.rightAscHours]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Coordinate 1 Hours"
                        type="number"
                        class="number"
                        required
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm2 v-if="type === 'Raster Scan'">
                        <v-text-field
                        v-model="form.firstCoordinate.minutes"
                        :rules="[rules.rightAscMinutes]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Coordinate 1 Minutes"
                        type="number"
                        class="number"
                        required
                        ></v-text-field>
                    </v-flex>
                     
                    <v-flex xs12 sm2 v-if="type === 'Raster Scan'">
                        <v-text-field
                        v-model="form.firstCoordinate.seconds"
                        :rules="[rules.rightAscSeconds]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Coordinate 1 Seconds"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                    
                    

                    <v-flex xs12 sm6 v-if="type === 'Raster Scan'">
                        <v-text-field
                        v-model="form.firstCoordinate.declination"
                        :rules="[rules.numRequired]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.declination.hasError
                        :error-messages=form.declination.errorMessage
                        onkeypress='return event.charCode == 45 || (event.charCode >= 48 && event.charCode <= 57)'
                        label="Coordinate 1 Declination"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>

                    <v-spacer></v-spacer>

                    <v-flex xs12 sm2 v-if="type === 'Raster Scan'">
                        <v-text-field
                        v-model="form.secondCoordinate.hours"
                        :rules="[rules.rightAscHours]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Coordinate 2 Hours"
                        type="number"
                        class="number"
                        required
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm2 v-if="type === 'Raster Scan'">
                        <v-text-field
                        v-model="form.secondCoordinate.minutes"
                        :rules="[rules.rightAscMinutes]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Coordinate 2 Minutes"
                        type="number"
                        class="number"
                        required
                        ></v-text-field>
                    </v-flex>
                     
                    <v-flex xs12 sm2 v-if="type === 'Raster Scan'">
                        <v-text-field
                        v-model="form.secondCoordinate.seconds"
                        :rules="[rules.rightAscSeconds]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        label="Coordinate 2 Seconds"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                    

                    <v-flex xs12 sm6 v-if="type === 'Raster Scan'">
                        <v-text-field
                        v-model="form.secondCoordinate.declination"
                        :rules="[rules.numRequired]"
                        :validate-on-blur="true"
                        color="blue darken-2"
                        :error=form.declination.hasError
                        :error-messages=form.declination.errorMessage
                        onkeypress='return event.charCode == 45 || (event.charCode >= 48 && event.charCode <= 57)'
                        label="Coordinate 2 Declination"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>

                    <!--
                        v-if="this.$store.state.isResearcher || this.$store.state.isAdmin"
                        only display this part of the form if current user is researcher or admin
                        This is a simple checkbox to choose to make the appointment private or not
                    -->
                    <v-flex v-if="this.$store.state.isResearcher || this.$store.state.isAdmin" xs12>
                        <v-checkbox
                        v-model="form.isPrivate.value"
                        color="green"
                        label="Private"
                        >
                        </v-checkbox>
                    </v-flex>
                    <!--
                        Simple drop down select menu to choose which telescope you want to schedule your appointment for
                        Added to form to make sure user knows which telescope they are scheduling for
                    -->
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <!-- Cancel resets form and closes Modal -->
                    <v-btn flat @click="resetForm">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <!-- Submit sends the form to backend to be verified -->
                    <v-btn
                    :disabled="!formIsValid"
                    flat
                    color="primary"
                    type="submit"
                    >Schedule</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
    </v-dialog>
</template>

<script>
import Event from '../../main.js'
import ApiDriver from '../../ApiDriver'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from '../../utils/CurrentUserValidation'
import router from '../../router';
import CustomErrorHandler from '../../utils/CustomErrorHandler.js';
export default {
    data() {
        name: 'Appointment'
        return {
            telescopes: [
                "John C. Rudy County Park Radio Telescope", 
                "Scale Model Radio Telescope",
                "Virtual Radio Telescope"
            ],
            types: [
                "Point",
                "Celestial Body",
                "Drift Scan",
                "Raster Scan"
            ],
            form: {
                isPrivate: {
                    value: false
                },
                rightAscension: {
                    hours: null,
                    minutes: null,
                    seconds: null,
                    hasError: false
                },
                declination: {
                    value: null,
                    hasError: false
                },
                azimuth: {
                    value: null
                },
                elevation: {
                    value: null
                },
                firstCoordinate: {
                    hours: null,
                    minutes: null,
                    seconds: null,
                    rightAscension: null,
                    declination: null
                },
                secondCoordinate: {
                    hours: null,
                    minutes: null,
                    seconds: null,
                    rightAscension: null,
                    declination: null
                }
            },
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',

            // Variables to keep track of chosen Appointment type
            type: 'Point',
            selectedType: '',

            // Variables to keep track of chosen Celestial Body
            bodies: [],
            selectedBody: '',
            searchInput: '',

            // Variable to store our pair of coordinates for Drift Scans
            coordinates: [],

            // Variable to keep track of whether or not we've updated our start/end times 
            updatedTime: false,
            /* This is the rules obj used in the form validation.
                val => (true or false logic) || 'text to display if false
            */
            rules: {
                dateRequired: val => (val && val.length > 0) || 'Required field',
                rightAscHours: val => (val && val.toString().length > 0 && val < 24 && val >= 0) || 'Must be between 0 and 23 hours',
                rightAscMinutes: val => (val && val.toString().length > 0 && val < 60 && val >= 0) || 'Must be between 0 and 59 minutes',
                rightAscSeconds: val => (val && val.toString().length > 0 && val < 60 && val >= 0) || 'Must be between 0 and 59 seconds',
                numRequired: val => (val && val.toString().length > 0 && val <=90 && val >= -90) || 'Must be between 90 and -90',
                azimuth: val => (val && val.toString().length > 0 && val >= 0 && val < 360) || 'Must be between 0 and 360',
                elevation: val => (val && val.toString().length > 0 && val >= 0 && val <= 90) || 'Must be between 0 and 90'
            },
            snackbar: false,
        }
    },
    props: {
        value: false,
        telescopeName: '',

        // Event prop to pass into the data fields start/endTime and date
        dragEvent: {}
    },
    methods: {
        // Method to reset the form then close the modal
        resetForm() {
            this.updatedTime = false;
            this.form.isPrivate.value = false;
            this.form.rightAscension.hours = null;
            this.form.rightAscension.minutes = null;
            this.form.rightAscension.seconds = null;
            this.form.declination.value = null;
            this.form.azimuth.value = null;
            this.form.elevation.value = null;
            this.form.firstCoordinate.hours = null;
            this.form.firstCoordinate.minutes = null;
            this.form.firstCoordinate.seconds = null;
            this.form.firstCoordinate.rightAscension = null;
            this.form.firstCoordinate.declination = null;
            this.form.secondCoordinate.hours = null;
            this.form.secondCoordinate.minutes = null;
            this.form.secondCoordinate.seconds = null;
            this.form.secondCoordinate.rightAscension = null;
            this.form.secondCoordinate.declination = null;
            this.startTime='';
            this.startDate='';
            this.endDate='';
            this.endTime='';
            this.selectedType = null;
            this.selectedBody = null;
            this.clearErrors();
            this.$emit('close-modal');
        },
        // Method to submit to back end
        submit() {
            // Clears the errors first to make sure that if backend sends back any errors we only display the current errors
            this.start = this.startDate + " " + this.startTime;
            this.end = this.endDate + " " + this.endTime;
            this.clearErrors();
            
            // Clear the coordinates array to prevent duplicates
            this.coordinates = [];

            // Handles making the selected Appointment Type string compatible with the back-end
            this.handleType();

            // set up form to send to back end with data from form obj
            let form = {
                userId: this.$store.state.currentUserId,
                startTime: new Date(this.start).toUTCString(),
                endTime: new Date(this.end).toUTCString(),
                telescopeId: this.telescopes.indexOf(this.telescopeName) + 1,
                isPublic: !this.form.isPrivate.value,
                hours: this.form.rightAscension.hours,
                minutes: this.form.rightAscension.minutes,
                seconds: this.form.rightAscension.seconds,
                declination: this.form.declination.value,
                celestialBodyId: this.selectedBody,
                azimuth: this.form.azimuth.value,
                elevation: this.form.elevation.value,
                coordinates: this.coordinates,
                priority: 'PRIMARY'
            };
                        
            // Call appropriate API CALL and send form in json format
            ApiDriver.Appointment.create(JSON.stringify(form), this.selectedType).then((response) => {
                HttpResponse.then(response, (data) => {
                    // If returns SUCCESS
                    this.snackbar = true;
                    
                    // Reset form before closing Modal as user can schedule multiple Appointments without leaving Scheduler Page
                    this.resetForm()
                        
                    // Call the created-event method on Scheduler.vue page so it knows whether to display the newly created event or not without doing a backend call again
                    this.$emit('created-event', form, data.data);
                    this.$emit('close-modal');
                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            HttpResponse.accessDenied(this)
                        } else {
                            this.handleErrors(errors, form);
                        }
                    });
            });
            this.startTime=''
            this.startDate=''
            this.endDate=''
            this.endTime=''
        },
        handleErrors(errors, formObj) {
            for (var field in errors) {
                let message = errors[field][0];
                if (field === "RIGHT_ASCENSION") {
                    CustomErrorHandler.populateError(this.form.rightAscension, message)
                } else if (field === "DECLINATION") {
                    CustomErrorHandler.populateError(this.form.declination, message)
                } else if (field == "ALLOTTED_TIME" && !this.$store.state.isGuest) {
                   //Changing startTime and endTime back to current time instead of UTC to display on request modal
                   //Also adding telescope name into Obj to display on request form
                   formObj.startTime = this.start
                   formObj.endTime = this.end
                   formObj.telescope = this.telescopeName
                   //Sends the information of the form to the requestAppointment function on Scheduler Page.
                   this.$emit('request-appointment', formObj)
                   this.resetForm()
                } else {
                    HttpResponse.generalError(this, message, false)
                }
            }
        },
        handleType() {
            // Handle setting up the proper API call to the back-end
            if(this.type == "Point") {
                this.selectedType = "coordinate";
            }
            else if(this.type == "Celestial Body") {
                this.selectedType = "celestial-body";
            }
            else if(this.type == "Drift Scan") {
                this.selectedType = "drift-scan";
            }
            else if(this.type == "Raster Scan") {
                this.selectedType = "raster-scan";
                
                // Add the two sets of coordinates to a single array to send to the back-end
                this.coordinates.push(this.form.firstCoordinate);
                this.coordinates.push(this.form.secondCoordinate);
            }
        },
        clearErrors() {
            CustomErrorHandler.clearError(this.form.rightAscension);
        },
        numbersOnly(val) {
            val = val.replace(/[^0-9]/g, '');
            return val;
        },
        updateTime() {
             // If the event is not empty, it's had values passed into it from the Scheduler page
            if(Object.keys(this.dragEvent).length !== 0 && (this.startTime != this.dragEvent.startTime || this.endTime != this.dragEvent.endTime)) {
                this.startTime = this.dragEvent.startTime;
                this.endTime = this.dragEvent.endTime;
                this.startDate = this.dragEvent.startDate;
                this.endDate = this.dragEvent.endDate;
                this.updatedTime = true;
                
                // Conditionally disable this.updatedTime if the modal is closing
                // prevents a bug with drag and drop scheduling consecutive appointments
                if(!this.value) {
                    this.updatedTime = false;
                }
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
        formIsValid() {
            if(this.type == 'Point') {    
                return (
                    this.startTime &&
                    this.endTime &&
                    this.startDate &&
                    this.endDate &&
                    this.form.rightAscension.hours,
                    this.form.rightAscension.minutes,
                    this.form.rightAscension.seconds,
                    this.form.declination.value
                )
            }
            else if(this.type == 'Celestial Body') {
                return (
                    this.startTime &&
                    this.endTime &&
                    this.startDate &&
                    this.endDate &&
                    this.selectedBody
                )
            }
            else if(this.type == 'Drift Scan') {
                return (
                    this.startTime &&
                    this.endTime &&
                    this.startDate &&
                    this.endDate &&
                    this.form.elevation.value,
                    this.form.azimuth.value
                )
            }
            else if(this.type == 'Raster Scan') {
                return (
                    this.startTime &&
                    this.endTime &&
                    this.startDate &&
                    this.endDate &&
                    this.form.firstCoordinate.hours,
                    this.form.firstCoordinate.minutes,
                    this.form.firstCoordinate.seconds,
                    this.form.firstCoordinate.rightAscension,
                    this.form.firstCoordinate.declination,
                    this.form.secondCoordinate.hours,
                    this.form.secondCoordinate.minutes,
                    this.form.secondCoordinate.seconds,
                    this.form.secondCoordinate.rightAscension,
                    this.form.secondCoordinate.declination
                )
            }
        }
    },

    updated: function() {
        // Update our start and end times based on the passed in prop from Scheduler.vue
        // This is only necessary in the case of a drag-n-drop appointment, and only needs to be called once
        if(!this.updatedTime) {
            this.updateTime();
        }
    },

    // Watch for the selected Appt Type to change, and clear the form object of past data when it does
    watch:  {
        type() {
            console.log("appt type changed");
        },
        searchInput(key) {
            this.getCelestialBodies(key);
        }
    }
}
</script>
<style scoped>
.title-style{
    padding-bottom: 10px;
}
.number input[type='number'] {
    -moz-appearance:textfield;
}
.number input::-webkit-outer-spin-button,
.number input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>