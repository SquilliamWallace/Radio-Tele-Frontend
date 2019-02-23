<template>
    <v-dialog class="modal" width="50%" dark :value="value" @input="$emit('input')" persistent>
        <!--
            Simple v-card that has a title and text body, with two buttons for confirmation or cancelling
        -->
        <v-card>
            <v-card-title class="headline">Are you sure you wish to cancel?</v-card-title>
            <v-card-text>If you cancel, your observation will be deleted and allow anyone else to schedule an observation during this timeslot.</v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="cancel">Yes</v-btn>
                <v-btn color="red darken-1" @click.native="toggleModal">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import router from '../../router'
import ApiDriver from '../../ApiDriver'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from '../../utils/CurrentUserValidation'
import { error } from 'util';
export default {
    name: "cancel-appointment",
    props: {
        value: false
    },
    methods: {
        // Method called if user wishes to cancel their scheduled appointment and confirms on the modal pop up.
        cancel() {
            ApiDriver.Appointment.cancel(this.$route.params.appointmentId).then((response) => {
                HttpResponse.then(response, (data) => {
                    // If SUCCESSFULL
                        // router.go(-1) sends them back to one page before the appointment page.
                        router.go(-1)
                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            HttpResponse.accessDenied(this);
                        } else if (parseInt(status) === 404) {
                            HttpResponse.notFound(this, errors);
                        } else {
                            // There should only be one error in this scenario
                            for (var field in errors) {
                                let message = errors[field][0];
                            }
                            HttpResponse.generalError(this, message, false)
                            this.confirmation = false
                        }
                    })
            });
        },
        // If user does not confirm cancelling appointment, close modal.
        toggleModal() {
            this.confirmation = !this.confirmation
            this.$emit('input');
        }
    }
}
</script>

<style scoped>
.modal {
    width: 50%
}
</style>
