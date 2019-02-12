<!-- Same form type as Appointment.vue except all fields are already populated by the appointment data -->
<template dark>
    <v-dialog dark hide-overlay :value="value" @input="$emit('input')" persistent width="50%">
            <v-card flat>
                <v-card-title class="headline">Edit Appointment</v-card-title>
                <v-form ref="form" @submit.prevent="submit" refs="form">
                <v-container grid-list-xl fluid>
                    <v-layout wrap>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="appointmentObj.start.value"
                        :rules="[rules.dateRequired]"
                        :error=appointmentObj.start.hasError
                        :error-messages=appointmentObj.start.errorMessage
                        :valiate-on-blur=true
                        color="blue darken-2"
                        label="Start Time"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="appointmentObj.end.value"
                        :rules="[rules.dateRequired]"
                        :error=appointmentObj.end.hasError
                        :error-messages=appointmentObj.end.errorMessage
                        color="blue darken-2"
                        label="End Time"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                         <v-text-field
                         v-model="appointmentObj.rightAscension.hours"
                         :rules="[rules.rightAscHours]"
                         color="blue darken-2"
                         :error=appointmentObj.rightAscension.hasError
                         label="Right Ascension Hours"
                         type="number"
                         mask="##"
                         required
                         ></v-text-field>
                     </v-flex>
                     <!--
                        Same as Right Ascension Hours, except checks for minutes error handling
                    -->
                     <v-flex xs12 sm4>
                         <v-text-field
                         v-model="appointmentObj.rightAscension.minutes"
                         :rules="[rules.rightAscMinutes]"
                         color="blue darken-2"
                         :error=appointmentObj.rightAscension.hasError
                         label="Right Ascension Minutes"
                         type="number"
                         mask="##"
                         required
                         ></v-text-field>
                     </v-flex>
                     <!--
                        Same as Right Ascension Hours, except checks for seconds error handling
                    -->
                     <v-flex xs12 sm4>
                         <v-text-field
                         v-model="appointmentObj.rightAscension.seconds"
                         :rules="[rules.rightAscSeconds]"
                         color="blue darken-2"
                         :error=appointmentObj.rightAscension.hasError
                         label="Right Ascension Seconds"
                         type="number"
                         mask="##"
                         required
                         ></v-text-field>
                     </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="appointmentObj.declination.value"
                        :rules="[rules.numRequired]"
                        :error=appointmentObj.declination.hasError
                        :error-messages=appointmentObj.declination.errorMessage
                        color="blue darken-2"
                        label="Declination"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex v-if="$store.state.isResearcher | $store.state.isAdmin" xs12>
                        <v-checkbox
                        v-model="appointmentObj.privacy.value"
                        color="green"
                        label="Private"
                        >
                        </v-checkbox>
                    </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat @click="$emit('input')">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                    :disabled="!validRequest"
                    flat
                    color="primary"
                    type="submit"
                    >Update</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
    </v-dialog>
</template>

<script>
import Event from '../main.js'
import ApiDriver from '../ApiDriver'
import HttpResponse from '../utils/HttpResponse'
import CurrentUserValidation from '../utils/CurrentUserValidation'
import CustomErrorHandler from '../utils/CustomErrorHandler.js';
export default {
    data() {
        return {
            form: {
                rightAscension: {
                        hours: null,
                        minutes: null,
                        seconds: null,
                        hasError: false
                },
            },
            rules: {
                dateRequired: val => (val && val.toString().length > 0) || 'Required field',
                rightAscHours: val => (val && val.toString().length > 0 && val < 24 && val >= 0) || 'Must be between 0 and 23 hours',
                rightAscMinutes: val => (val && val.toString().length > 0 && val < 60 && val >= 0) || 'Must be between 0 and 59 minutes',
                rightAscSeconds: val => (val && val.toString().length > 0 && val < 60 && val >= 0) || 'Must be between 0 and 59 seconds',
                numRequired: val => (val && val.toString().length > 0 && val <=90 && val >= -90) || 'Must be between 90 and -90'
            }
        }
    },
    props: {
        appointmentObj: {},
        value: false
    },
    methods: {
        submit() {
            this.clearErrors();

            let data = JSON.stringify({
                startTime: new Date(this.appointmentObj.start.value).toUTCString(),
                endTime: new Date(this.appointmentObj.end.value).toUTCString(),
                telescopeId: this.appointmentObj.telescopeId.value,
                isPublic: !this.appointmentObj.privacy.value,
                hours: this.appointmentObj.rightAscension.hours,
                minutes: this.appointmentObj.rightAscension.minutes,
                seconds: this.appointmentObj.rightAscension.seconds,
                declination: this.appointmentObj.declination.value
            });
            ApiDriver.Appointment.update(this.appointmentObj.id.value, data).then((response) => {
                HttpResponse.then(response, (data) => {
                    this.$emit('edited', this.appointmentObj)
                    this.$emit('input');

                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            HttpResponse.accessDenied(this)
                        } else if (parseInt(status) === 404) {
                            HttpResponse.notFound(this, errors)
                        } else {
                            this.handleErrors(errors);
                        }
                    });
            });
        },
        handleErrors(errors) {
            for (var field in errors) {
                let message = errors[field][0];

                if (field === "RIGHT_ASCENSION") {
                    CustomErrorHandler.populateError(this.appointmentObj.rightAscension, message)
                } else if (field === "DECLINATION") {
                    CustomErrorHandler.populateError(this.appointmentObj.declination, message)
                } else if (field === "START_TIME") {
                    CustomErrorHandler.populateError(this.appointmentObj.start, message)
                } else if (field === "END_TIME") {
                    CustomErrorHandler.populateError(this.appointmentObj.end, message)
                } else {
                    HttpResponse.generalError(this, message, false)
                }
            }
        },
        clearErrors() {
            CustomErrorHandler.clearError(this.appointmentObj.rightAscension)
            CustomErrorHandler.clearError(this.appointmentObj.declination)
            CustomErrorHandler.clearError(this.appointmentObj.start)
            CustomErrorHandler.clearError(this.appointmentObj.end)
        }        
    },
    computed: {
        validRequest() {
            return (this.appointmentObj.rightAscension.hours &&
                    this.appointmentObj.rightAscension.minutes &&
                    this.appointmentObj.rightAscension.seconds &&
                    this.appointmentObj.declination.value &&
                    this.appointmentObj.start.value &&
                    this.appointmentObj.end.value)
        }
    }
}
</script>
<style scoped>

</style>
