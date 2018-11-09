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
                    <v-flex v-if="this.$store.state.isResearcher || this.$store.state.isAdmin" xs12>
                        <v-checkbox
                        v-model="form.isPrivate"
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
export default {
    data() {
        name: 'Appointment'
        return {
            
            form: {
                isPrivate: false
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
            this.form = {
                isPrivate: false
            }
            this.$emit('close-modal');
        },
        submit() {
            var date = new Date(this.eventObj.start)
            let createdEvent = {
                userId: this.$store.state.currentUserId,
                startTime: new Date(this.eventObj.start).toUTCString(),
                endTime: new Date(this.eventObj.end).toUTCString(),
                telescopeId: 1,
                isPublic: !this.form.isPrivate
            }
            let data = JSON.stringify({
                userId: this.$store.state.currentUserId,
                startTime: new Date(this.eventObj.start).toUTCString(),
                endTime: new Date(this.eventObj.end).toUTCString(),
                telescopeId: 1,
                isPublic: !this.form.isPrivate
            })
            console.log(data)

            // This will need changed to properly handle success or failure scenarios
            ApiDriver.Appointment.create(data).then((response) => {
                console.log(response);
                HttpResponse.then(response, (data) => {
                        this.snackbar = true;
                        this.form = {
                            isPrivate: false
                        }
                        
                        this.$emit('created-event', createdEvent, response.data.data);
                        this.$emit('close-modal');
                        //document.location.reload(true);
                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">Access Denied<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
                        } else {
                            console.log(status)
                            console.log(errors)
                        }
                    })
            });
            
        }
    },
    computed: {
        formIsValid() {
            if(this.eventObj.start && this.eventObj.end){
                return true;
            }
            else{
                return false;
            }
        }
    }
}
</script>

<style scoped>

</style>
