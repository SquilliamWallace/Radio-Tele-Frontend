<template>
    <v-dialog width="50%" dark :value="value" @input="$emit('input')">
        <v-card>
            <v-card-title>Select Users with which you would like to share your appointment</v-card-title>
            <admin-user-management>
                <template slot-scope="user">
                    <v-checkbox @mousedown="populateUser(user)" v-model="selectedUsers[user.id]"></v-checkbox>
                </template>
            </admin-user-management>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="share">Share</v-btn>
                <v-btn color="red darken-1" @click.native="toggleModal">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ApiDriver from '../../ApiDriver'
import HttpResponse from '../../utils/HttpResponse'
import AdminUserManagement from '../../components/admin/AdminUserManagement'
import { error } from 'util';
export default {
    name:"share-appointment",
    props: {
        value: false
    },
    data() {
        return {
            selectedUsers: [],
            users: []
        }
    },
    methods: {
        share() {
            for(var i =0; i < this.users.length; i++){
                ApiDriver.Appointment.share(this.$route.params.appointmentId, this.users[i]).then((response) =>{
                HttpResponse.then(response, (data) => {
                     this.$swal({
                        title: '<span style="color:#f0ead6">Appointment Shared<span>',
                        html: '<span style="color:#f0ead6">This Appointment has been shared with the designated users   <span>',
                        type: 'success',
                        background: '#302f2f'
                    });
                    this.$emit('input');
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
            this.$emit('input')
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
        }
    },
    components: {
        AdminUserManagement
    }
}
</script>

<style scoped>
</style>
