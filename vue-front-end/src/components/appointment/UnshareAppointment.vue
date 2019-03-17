<template>
    <v-dialog width="50%" dark :value="value" @input="$emit('input')">
        <v-card>
            <v-card-title>Select Users with which you would like to unshare your appointment</v-card-title>
            <admin-user-management>
                <template slot-scope="user">
                    <v-checkbox @mousedown="populateUser(user)" v-model="selectedUsers[user.id]"></v-checkbox>
                </template>
            </admin-user-management>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="unshare">Unshare</v-btn>
                <v-btn color="red darken-1" @click.native="toggleModal">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ApiDriver from '../../ApiDriver'
import HttpResponse from '../../utils/HttpResponse'
import { error } from 'util';
export default {
    name:"unshare-appointment",
    props: {
        value: false
    },
    data() {
        return {
            selectedUsers: [],
            users: [],
            page: 1,
            pageSize: 10
        }
    },
    methods: {
        unshare() {
            for(var i =0; i < this.users.length; i++){
                ApiDriver.Appointment.unshare(this.$route.params.appointmentId, this.users[i]).then((response) =>{
                HttpResponse.then(response, (data) => {
                     this.$swal({
                        title: '<span style="color:#f0ead6">Appointment Unshared<span>',
                        html: '<span style="color:#f0ead6">This Appointment is no longer being shared with the designated users<span>',
                        type: 'success',
                        background: '#302f2f'
                    });
                }, (status, errors) => {
                    if(parseInt(status)==403){
                        HttpResponse.accessDenied(this)
                    } else if(parseInt(status)==404){
                        HttpResponse.notFound(this, errors)
                    } else {
                        for(var field in errors) {
                            let message = errors[field][0]
                        }
                        HttpResponse.generalError(this, message, false)
                    }
                })
            })
            }
        },
        listShared() {
            ApiDriver.Appointment.sharedUsers(this.$route.params.appointmentId, this.page, this.pageSize).then((response) => {
                HttpResponse.Then(response, data => {
                    console.log(data);
                })
            }
            )
        },
        toggleModal() {
            this.$emit('input');
            this.users= [];
            this.selectedUsers= [];
        },
        populateUser(user) {
            if(!this.users.includes(user.email)){
                this.users.push(user.email)
            }
        },
    },
    mounted: function() {
        this.listShared();
    }
}
</script>

<style scoped>
</style>
