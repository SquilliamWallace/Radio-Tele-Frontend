<template>
    <v-dialog width="50%" dark :value="value" @input="$emit('input')">
        <loading v-if="$store.state.isLoading"></loading>
        <v-card v-if="!$store.state.isLoading">
            <v-card-title>Select Users with which you would like to unshare your appointment</v-card-title>
            <v-list>
                <v-list-tile v-for="user in userData" :key=user.id>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{user.firstName}} {{user.lastName}}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                            {{user.email}}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-checkbox @mousedown="populateUser(user)" v-model="selectedUsers[user.id]"></v-checkbox>
                </v-list-tile>
            </v-list>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="unshare">Unshare</v-btn>
                <v-btn color="red darken-1" @click.native="toggleModal">Cancel</v-btn>
            </v-card-actions>
        <div v-if="numPages>1 && !$store.state.isLoading" class="text-xs-center">
            <v-pagination
            circle
            v-model="pageDisplay"
            :length="numPages"
            @input="next"></v-pagination>
        </div>
        <v-layout v-if="!$store.state.isLoading" justify-center>
            <v-flex xs12 sm1>
                <v-select
                v-model="selectedPageSize"
                :items="pageSizes"
                label="Items per page"
                v-on:change="this.pageSizeUpdate"
                ></v-select>
            </v-flex>
        </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
import ApiDriver from '../../ApiDriver'
import HttpResponse from '../../utils/HttpResponse'
import Loading from '../utility/Loading'
import { error } from 'util';
export default {
    name:"unshare-appointment",
    props: {
        value: false
    },
    components: {
        Loading
    },
    data() {
        return {
            selectedUsers: [],
            users: [],
            userData: [],
            numPages: 0,
            page: 0,
            shownPage: 1,
            selectedPageSize: 10,
            pageSizes: [
                '10', '25', '50', '100'
            ]
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
            this.$emit('input')
        },
        listShared() {
            this.$store.commit("loading", true)
            ApiDriver.Appointment.sharedUsers(this.$route.params.appointmentId, this.page, this.selectedPageSize).then((response) => {
                HttpResponse.then(response, data => {
                    this.populateData(data.data)
                    this.$store.commit("loading", false)
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
            if(!this.users.includes(user.id)){
                this.users.push(user.id)
            }
        },
        populateData(data) {
            this.userData = data.content;
            this.numPages = data.totalPages
        },
        next(page) {
            this.page = page - 1;
            this.shownPage = page;
            this.userData = [];
            this.listShared();
        },
        pageSizeUpdate(){
            this.users = []
            this.listShared();
        },
    },
    mounted: function() {
        this.listShared();
    }
}
</script>

<style scoped>
</style>
