<template>
    <v-dialog width="50%" :value="value" dark @input="$emit('input')" persistent>
        <v-card>
            <v-card-title class="headline justify-center">Your Observation puts you over your alloted time.</v-card-title>
            <v-card-text>You cannot have more than 50 hours of observation scheduled at one time. You can request this observation to be approved, or you can cancel this request.</v-card-text>
            <v-spacer></v-spacer>
            <v-card-text>Telescope: {{ Appointment.telescope }}</v-card-text>
            <v-card-text>Start Time: {{ Appointment.startTime }}</v-card-text>
            <v-card-text>End Time: {{ Appointment.endTime }}</v-card-text>
            <v-card-text>Private Event: {{ !Appointment.isPublic }}</v-card-text>
            <v-card-text>Right Ascension: {{ Appointment.rightAscension }}  Declination: {{ Appointment.declination }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="request">Request</v-btn>
                <v-btn color="red darken-1" @click.native="toggleModal">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import router from '../router'
import ApiDriver from '../ApiDriver'
import HttpResponse from '../utils/HttpResponse'

export default {
    name: "requestForm",
    props: {
        Appointment: {},
        value: false
    },
    methods: {
        request() {
            let requestAppointment = {
                userId: this.$store.state.currentUserId,
                startTime: new Date(this.Appointment.startTime).toUTCString(),
                endTime: new Date(this.Appointment.endTime).toUTCString(),
                telescopeId: this.Appointment.telescopeId,
                isPublic: this.Appointment.isPublic,
                rightAscension: this.Appointment.rightAscension,
                declination: this.Appointment.declination
            };

            ApiDriver.Appointment.request(JSON.stringify(requestAppointment)).then((response) => {
                HttpResponse.then(response, (data) => {
                        this.$emit('input');
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

                HttpResponse.generalError(this, message, false)
                
            }
        },
        toggleModal() {
            this.$emit('input');
        }
    }
}
</script>

<style scoped>

</style>
