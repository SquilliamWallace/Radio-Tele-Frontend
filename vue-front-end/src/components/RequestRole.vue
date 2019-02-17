<template dark>
    <v-dialog dark :value="value" @input="$emit('input')" persistent width="30%">
            <v-card flat>
                <v-card-title class="headline">Request New Role</v-card-title>
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
                    <!--  -->
                    <!-- Submit button -->
                    <v-btn 
                    color="green"
                    type="submit"
                    >Submit</v-btn>
                    <v-spacer></v-spacer>
                    <!-- Cancel button -->
                    <v-btn 
                    color="red" 
                    :cancel=true
                    type="cancel"
                    >Cancel</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
    </v-dialog>
</template>

<script>
// TODO: clean these up
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
            this.$emit("chosen", this.defaultRole)
            //console.log(this.defaultRole)
            this.$emit('input')
        }

    }
}
</script>

<style scoped>

</style>