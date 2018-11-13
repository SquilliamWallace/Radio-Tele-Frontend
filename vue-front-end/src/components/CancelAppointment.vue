<template>
    <v-dialog class="modal" width="50%" dark :value="value" @input="$emit('input')" persistent>
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
import router from '../router'
import ApiDriver from '../ApiDriver'
import HttpResponse from '../utils/HttpResponse'
import CurrentUserValidation from '../utils/CurrentUserValidation'
import { error } from 'util';
export default {
    name: "cancel-appointment",
    props: {
        value: false
    },
    methods: {
        cancel() {
            ApiDriver.Appointment.cancel(this.$route.params.appointmentId).then((response) => {
                HttpResponse.then(response, (data) => {
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
