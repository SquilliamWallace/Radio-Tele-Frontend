<template dark>
    <v-dialog dark hide-overlay :value="value" @input="$emit('input')" persistent width="50%">
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
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="eventObj.start"
                        color="blue darken-2"
                        label="Start Time"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="eventObj.end"
                        color="blue darken-2"
                        label="End Time"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.rightAscension.value"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        label="Right Ascension"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.declination.value"
                        color="blue darken-2"
                        :error=form.declination.hasError
                        :error-messages=form.declination.errorMessage
                        label="Declination"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex v-if="this.$store.state.isResearcher || this.$store.state.isAdmin" xs12>
                        <v-checkbox
                        v-model="form.isPrivate.value"
                        color="green"
                        label="Private"
                        >
                        </v-checkbox>
                    </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat @click="resetForm">Cancel</v-btn>
                    <v-spacer></v-spacer>
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
import Event from '../main.js'
import ApiDriver from '../ApiDriver'
import HttpResponse from '../utils/HttpResponse'
import CurrentUserValidation from '../utils/CurrentUserValidation'
import router from '../router';
import CustomErrorHandler from '../utils/CustomErrorHandler.js';
export default {
    data() {
        name: 'Appointment'
        return {
            form: {
                isPrivate: {
                    value: false
                },
                rightAscension: {
                    value: null,
                    hasError: false
                },
                declination: {
                    value: null,
                    hasError: false
                }
            },
            snackbar: false,
        }
    },
    props: {
        eventObj: {},
        value: false
    },
    methods: {
        resetForm() {
            this.form.isPrivate.value = false;
            this.form.rightAscension.value = null;
            this.form.declination.value = null;
            this.clearErrors();
            this.$emit('close-modal');
        },
        submit() {
            this.clearErrors();
            let createdEvent = {
                userId: this.$store.state.currentUserId,
                startTime: new Date(this.eventObj.start).toUTCString(),
                endTime: new Date(this.eventObj.end).toUTCString(),
                telescopeId: 1,
                isPublic: !this.form.isPrivate.value
            }

            let data = JSON.stringify({
                userId: this.$store.state.currentUserId,
                startTime: new Date(this.eventObj.start).toUTCString(),
                endTime: new Date(this.eventObj.end).toUTCString(),
                telescopeId: 1,
                isPublic: !this.form.isPrivate.value,
                rightAscension: this.form.rightAscension.value,
                declination: this.form.declination.value
            });

            ApiDriver.Appointment.create(data).then((response) => {
                HttpResponse.then(response, (data) => {
                        this.snackbar = true;
                        this.resetForm()
                        
                        this.$emit('created-event', createdEvent, response.data.data);
                        this.$emit('close-modal');
                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            HttpResponse.accessDenied(this)
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
                    CustomErrorHandler.populateError(this.form.rightAscension, message)
                } else if (field === "DECLINATION") {
                    CustomErrorHandler.populateError(this.form.declination, message)
                } else {
                    HttpResponse.generalError(this, message, false)
                }
            }
        },
        clearErrors() {
            CustomErrorHandler.clearError(this.form.rightAscension);
            CustomErrorHandler.clearError(this.form.declination);
        }
    },
    computed: {
        formIsValid() {
            return (this.eventObj.start && this.eventObj.end)
        }
    }
}
</script>
<style scoped>

</style>
