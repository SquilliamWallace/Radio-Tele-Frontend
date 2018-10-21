<template dark>
    <v-toolbar style="width:100%;">
        <v-container v-bind:style="{ padding:'50px' }">
            <v-card flat>
                <v-snackbar
                v-model="snackbar"
                absolute
                top
                right
                color="success"
                >
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
                        <v-select
                        v-model="this.appointmentType"
                        :items="this.appointmentTypes"
                        color="blue darken-2"
                        label="Appointment Type"
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
        </v-container>
    </v-toolbar>
</template>

<script>
import Event from '../main.js'
export default {
    data() {
        name: 'Appointment'
        return {
            
            form: {
                start: '2018-10-09T00:00:01',
                end: '2018-10-10T15:00:00',
                username: 'patrick_star'
            },
            appointmentType: "Public",
            snackbar: false,
        }
    },
    props: {
        eventObj: {}
    },
    methods: {
        resetForm() {
            this.form = {
                start: null,
                end: null,
                username: null
            }
            this.$emit('close-modal');
        },
        submit() {
            this.snackbar = true;
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
