<template>
    <div>
        <navigation-bar></navigation-bar>
        <loading v-show="$store.state.isLoading"></loading>
        <v-container v-show="!$store.state.isLoading" id = "profile" width = "700px" >
            <v-layout row wrap>
            <v-flex xs4>
               <v-card class = "elevation-0" color = "transparent">
                   <v-avatar size = "200">
                        <img src="https://i.kym-cdn.com/entries/icons/original/000/009/803/spongebob-squarepants-patrick-spongebob-patrick-star-background-225039.jpg" alt="Patrick">
                    </v-avatar>
                    <div class = "headline">{{ profile.firstName.value }} {{ profile.lastName.value }}</div>
               </v-card>
            </v-flex>
            <v-flex xs8>
                <v-card class = "elevation-0" color = "transparent">
                    <v-divider></v-divider>
                    <div class = "headline text-xs-left">Email <v-icon>email</v-icon></div>
                    <div id = "profileInfo" class = "text-xs-left">{{ profile.email.value }}</div>
                    <v-divider></v-divider>
                    <div v-show="profile.phone.value" class = "headline text-xs-left">Phone <v-icon>phone</v-icon></div>
                    <div v-show="profile.phone.value" gid = "profileInfo" class = "text-xs-left">{{ profile.phone.value }}</div>
                    <v-divider></v-divider>
                    <div v-show="profile.company.value" class = "headline text-xs-left">Company  <v-icon>business</v-icon></div>
                    <div v-show="profile.company.value" id = "profileInfo" class = "text-xs-left">{{ profile.company.value }}</div>
                    <v-divider></v-divider>
                    <div class = "headline text-xs-left">Membership <v-icon>person</v-icon></div>
                    <div id = "profileInfo" class = "text-xs-left">{{ profile.type.value }}</div>
                    <v-divider></v-divider>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <br><br><br>
                <div>
                    <v-btn color="red darken-1" @click="editRedirect">Edit Profile</v-btn>
                    <v-btn color="primary" @click="completedAppointmentsRedirect">View Completed Observations</v-btn>
                    <v-btn color="primary" @click="futureAppointmentsRedirect">View Future Observations</v-btn>
                </div>
            </v-flex>
            
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import NavigationBar from '../../components/NavigationBar.vue'
import ApiDriver from '../../ApiDriver'
import router from '../../router'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from '../../utils/CurrentUserValidation'
import Loading from "../../components/Loading"
export default {
    name: "ViewProfile",
    data() {
        return {
            profile: {
                id: { value: null },
                firstName: { value: "" },
                lastName: { value: "" },
                email: { value: "" },
                phone: { value: "" },
                company: { value: "" },
                type: { value: "" }
            }
        }
    },
    components: {
      NavigationBar,
      Loading
    },
    methods: {
        editRedirect() {
            router.push('/users/' + this.$route.params.userId + '/edit')
        },
        futureAppointmentsRedirect() {
            router.push('/users/' + this.profile.id.value + '/appointments/future')
        },
        completedAppointmentsRedirect() {
            router.push('/users/' + this.profile.id.value + '/appointments/completed')
        },
        retrieveInformation() {
            let that = this;
            if (!this.$route.params.userId) {
                router.push('/')
            } else {    
                this.$store.commit("loading", true);
                ApiDriver.User.get(this.$route.params.userId).then((response) => {
                    HttpResponse.then(response, (data) => {
                        that.populateData(data.data)
                        this.$store.commit("loading", false)
                    }, (status, errors) => {
                        console.log(errors);
                        if (parseInt(status) === 403) {
                            HttpResponse.accessDenied(that)
                        } else if (parseInt(status) === 404) {
                            HttpResponse.notFound(that, errors)
                        }
                    })
                }).catch((errors) => {
                    let message = "An error occurred when loading this user\'s information"
                    HttpResponse.generalError(this, message)
                })
            }
        },
        populateData(data) {
            this.profile.id.value = data.id;
            this.profile.firstName.value = data.firstName;
            this.profile.lastName.value = data.lastName;
            this.profile.email.value = data.email;
            this.profile.phone.value = data.phoneNumber;
            this.profile.company.value = data.company;
            if (data.membershipRole) {
                this.profile.type.value = data.membershipRole;
            } else {
                this.profile.type.value = "Pending Approval";
            }   
        }
    },
    mounted() {
        this.retrieveInformation()
    }
}
</script>

<style scoped>
    #profile {
        border: 0px solid white;
        margin-top: 100px;
    }
    #profileInfo {
        font-size: 20px;
    }
</style>

