<template>
    <v-dialog class="modal" width="50%" dark :value="value" @input="$emit('input')" persistent>
        <v-card>
            <v-card-title class="headline">Are you sure you wish to cancel?</v-card-title>
            <v-card-text>If you cancel, your observation will be deleted and allow anyone else to scedule an observation during this timeslot.</v-card-text>
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
export default {
    name: "cancel-appointment",
    props: {
        value: false
    },
    methods: {
        cancel() {
            ApiDriver.Appointment.cancel(this.$route.params.appointmentId).then((response) => {
                console.log(response);
                HttpResponse.then(response, (data) => {
                        router.go('/home')

                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">Access Denied<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        } else {
                            console.log(status)
                            console.log(errors)
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
