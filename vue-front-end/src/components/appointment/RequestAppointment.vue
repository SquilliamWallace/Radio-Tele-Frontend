<!-- 
    This is a simple textual modal that displays all of the information of the appointment that was trying to be scheduled
    but the user was already at max alloted time. It takes the appointment object as a prop and displays all the information
    then asks if the user would like to request the appointment for admin overide approval, or simply cancel it
 -->
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
            <v-card-text v-if="Appointment.type === 'Point'">
                Coordinates: <br/>
                Hours: {{ Appointment.hours }}, Minutes: {{ Appointment.minutes }}, Declination: {{ Appointment.declination }}
            </v-card-text>
            <v-card-text v-if="Appointment.type === 'Celestial Body'">
                Celestial Body: {{ Appointment.celestialBodyName }}
            </v-card-text>
            <v-card-text v-if="Appointment.type === 'Drift Scan'">
                Azimuth: {{ Appointment.azimuth }} <br/>
                Elevation: {{ Appointment.elevation }}
            </v-card-text>
            <v-card-text v-if="Appointment.type === 'Raster Scan'">
                First Coordinate: <br/>
                Hours: {{ Appointment.coordinates[0].hours }}, Minutes: {{ Appointment.coordinates[0].minutes }}, Declination: {{ Appointment.coordinates[0].declination }} <br/>
                <br/>
                Second Coordinate: <br/>
                Hours: {{ Appointment.coordinates[1].hours }}, Minutes: {{ Appointment.coordinates[1].minutes }}, Declination: {{ Appointment.coordinates[1].declination }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="request">Request</v-btn>
                <v-btn color="red darken-1" @click.native="toggleModal">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import router from '../../router'
import ApiDriver from '../../ApiDriver'
import HttpResponse from '../../utils/HttpResponse'

export default {
    name: "requestForm",
    props: {
        Appointment: {},
        value: false
    },
    methods: {
        // Method called if they want to request an admin to review there appointmetn and approve or deny it, if user is over alloted time
        request() {
            // console.log("RequestAppointment.vue: " + JSON.stringify(this.Appointment));
            let requestAppointment = {
                userId: this.$store.state.currentUserId,
                startTime: new Date(this.Appointment.startTime).toUTCString(),
                endTime: new Date(this.Appointment.endTime).toUTCString(),
                telescopeId: this.Appointment.telescopeId,
                isPublic: this.Appointment.isPublic,
                priority: this.Appointment.priority,
                hours: this.Appointment.hours,
                minutes: this.Appointment.minutes,
                // seconds: this.Appointment.seconds,
                declination: this.Appointment.declination,
                azimuth: this.Appointment.azimuth,
                elevation: this.Appointment.elevation,
                celestialBodyId: this.Appointment.celestialBodyId,
                coordinates: this.Appointment.coordinates
            };

            ApiDriver.Appointment.request(JSON.stringify(requestAppointment), this.mapApptType()).then((response) => {
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
        },
        mapApptType() {
            switch(this.Appointment.type){
                case "Point":
                    return "coordinate";
                case "Celestial Body":
                    return "celestial-body";
                case "Drift Scan":
                    return "drift-scan";
                case "Raster Scan":
                    return "raster-scan";
                default:
                    return "coordinate";
            }

        }
    }
}
</script>

<style scoped>

</style>
