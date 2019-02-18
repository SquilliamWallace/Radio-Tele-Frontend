<template dark>
    <v-dialog dark :value="value" @input="$emit('input')" persistent width="30%">
            <v-card flat>
                <v-card-title class="headline">Request New Role</v-card-title>
                <!-- @submit.prevent="submit"
                     prevents the page from reloading when submit is called -->
                <v-form ref="form" @submit.prevent="submit" refs="form">
                <v-container grid-list-xs fluid>
                    <v-flex xs12 sm6>
                        <v-select
                        v-model="defaultRole"
                        :items="roles"
                        color="blue darken-2"
                        label="Role"
                        required
                        ></v-select>
                    </v-flex>
                </v-container>
                <v-card-actions>
                    <!-- Submit button -->
                    <v-btn 
                    @click.native=submit
                    color="green"
                    >Submit</v-btn>
                    <v-spacer></v-spacer>
                    <!-- Cancel button -->
                    <v-btn 
                    @click.native=cancel
                    color="red" 
                    >Cancel</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
    </v-dialog>
</template>

<script>
import { error } from 'util';
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import ApiDriver from "../ApiDriver";

export default {
    data() {
        return {
            defaultRole: "Member",
            roles: [
                "Member",
                "Student",
                "Researcher"
            ]
        }
    },

    props: {
        value: false
    },

    methods: {
        submit() {
            // This line sends the User's choice from the list of roles to the
            // parent, through use of @chosen="parentFunction"
            this.$emit("chosen", this.defaultRole)
            this.$emit('input')
        }, 
        cancel() {
            // Pass a false value to ViewProfile to indicate that we want
            // the modal closed, through the use of @false="cancelRoleRequest"
            this.$emit("cancel", false)
            this.$emit('input')
        }

    }
}
</script>

<style scoped>

</style>