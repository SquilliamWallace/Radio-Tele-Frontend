<template dark>
    <v-dialog dark hide-overlay :value="value" @input="$emit('input')" persistent width="50%">
            <v-card flat>
                <v-card-title class="headline">Edit Appointment</v-card-title>
                <v-form ref="form" @submit.prevent="submit" refs="form">
                <v-container grid-list-xl fluid>
                    <v-layout wrap>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="appointmentObj.start"
                        color="blue darken-2"
                        label="Start Time"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="appointmentObj.end"
                        color="blue darken-2"
                        label="End Time"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex v-if="$store.state.isResearcher | $store.state.isAdmin" xs12>
                        <v-checkbox
                        v-model="appointmentObj.privacy"
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
export default {
    props: {
        appointmentObj: {},
        value: false
    },
    methods: {
        submit() {

            let data = JSON.stringify({
                startTime: new Date(this.appointmentObj.start).toUTCString(),
                endTime: new Date(this.appointmentObj.end).toUTCString(),
                telescopeId: this.appointmentObj.Tele,
                isPublic: !this.appointmentObj.privacy
            })
//
            // This will need changed to properly handle success or failure scenarios
            ApiDriver.Appointment.update(this.appointmentObj.id, data).then((response) => {
                console.log(response);
                HttpResponse.then(response, (data) => {
                        this.$emit('input');

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
            
        }
    }
}
</script>

<style scoped>

</style>
