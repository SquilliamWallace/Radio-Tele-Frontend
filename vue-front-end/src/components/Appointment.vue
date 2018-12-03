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
                        :rules="[rules.dateRequired]"
                        color="blue darken-2"
                        label="Start Time"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="eventObj.end"
                        :rules="[rules.dateRequired]"
                        color="blue darken-2"
                        label="End Time"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-text-field
                        v-model="form.rightAscension.hours"
                        :rules="[rules.numRequired]"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        label="Right Ascension Hours"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-text-field
                        v-model="form.rightAscension.minutes"
                        :rules="[rules.numRequired]"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        label="Right Ascension Minutes"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-text-field
                        v-model="form.rightAscension.seconds"
                        :rules="[rules.numRequired]"
                        color="blue darken-2"
                        :error=form.rightAscension.hasError
                        :error-messages=form.rightAscension.errorMessage
                        label="Right Ascension Seconds"
                        type="number"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                        <v-text-field
                        v-model="form.declination.value"
                        :rules="[rules.numRequired]"
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
                    <v-flex xs12 sm6>
                        <v-select
                        v-model="telescopeName"
                        :items="telescopes"
                        color="blue darken-2"
                        label="Telescope"
                        required
                        ></v-select>
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
            telescopes: [
                "John Rudy Park",
                "Scale Model",
                "Virtual"
            ],
            telescopeName: "", 
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
                }
            },
            rules: {
                dateRequired: val => (val && val.length > 0) || 'Required field',
                numRequired: val => (val && val.toString().length > 0) || 'Required field'
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
            this.form.rightAscension.hours = null;
            this.form.rightAscension.minutes = null;
            this.form.rightAscension.seconds = null;
            this.form.declination.value = null;
            this.clearErrors();
            this.$emit('close-modal');
        },
        submit() {
            this.clearErrors();
            let form = {
                userId: this.$store.state.currentUserId,
                startTime: new Date(this.eventObj.start).toUTCString(),
                endTime: new Date(this.eventObj.end).toUTCString(),
                telescopeId: this.telescopes.indexOf(this.telescopeName) + 1,
                isPublic: !this.form.isPrivate.value,
                hours: this.form.rightAscension.hours,
                minutes: this.form.rightAscension.minutes,
                seconds: this.form.rightAscension.seconds,
                declination: this.form.declination.value
            };

            ApiDriver.Appointment.create(JSON.stringify(form)).then((response) => {
                HttpResponse.then(response, (data) => {
                        this.snackbar = true;
                        this.resetForm()
                        
                        this.$emit('created-event', form, data.data);
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
        }
    },
    computed: {
        formIsValid() {
            return (this.eventObj.start &&
                    this.eventObj.end &&
                    this.form.rightAscension.hours,
                    this.form.rightAscension.minutes,
                    this.form.rightAscension.seconds,
                    this.form.declination.value)
        }
    }
}
</script>
<style scoped>

</style>
