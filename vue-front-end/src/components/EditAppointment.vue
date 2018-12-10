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
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="appointmentObj.rightAscension.value"
                        :rules="[rules.numRequired]"
                        :error=appointmentObj.rightAscension.hasError
                        :error-messages=appointmentObj.rightAscension.errorMessage
                        color="blue darken-2"
                        label="Right Ascension"
                        type="number"
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
            rules: {
                dateRequired: val => (val && val.length > 0) || 'Required field',
                numRequired: val => (val && val.toString().length > 0) || 'Required field'
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
                rightAscension: this.appointmentObj.rightAscension.value,
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
            return (this.appointmentObj.rightAscension.value &&
                    this.appointmentObj.declination.value &&
                    this.appointmentObj.start.value &&
                    this.appointmentObj.end.value)
        }
    }
}
</script>
<style scoped>

</style>
