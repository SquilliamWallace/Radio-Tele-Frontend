<template>
    <div>
        <navigation-bar></navigation-bar>
        <v-container id = "profile" width = "700px" >
            <v-layout row wrap>
            <v-flex xs6>
               <v-card class = "elevation-0" color = "transparent">
                   <v-avatar size = "200">
                        <img src="https://i.kym-cdn.com/entries/icons/original/000/009/803/spongebob-squarepants-patrick-spongebob-patrick-star-background-225039.jpg" alt="Patrick">
                    </v-avatar>
                    <div class = "headline">{{ profile.firstName.value }} {{ profile.lastName.value }}</div>
               </v-card>
            </v-flex>
            <v-flex xs6>
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
            <v-flex xs6>
                <div>
                    <v-btn @click="editRedirect">Edit</v-btn>
                </div>
            </v-flex>
            
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'
import ApiDriver from '../ApiDriver'
import router from '../router'
export default {
    name: "ViewProfile",
    data() {
        return {
            profile: {
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
      NavigationBar
    },
    methods: {
        editRedirect() {
            router.push('/editProfile')
        },
        retrieveInformation() {
            if (!this.$store.state.currentUserId) {
                router.push('/home')
            } else {    
                ApiDriver.User.get(this.$store.state.currentUserId).then((response) => {
                    this.populateData(response.data.data)
                }).catch((errors) => {
                    alert("An error occurred loading this user's information");
                    console.log(errors)
                })
            }
        },
        populateData(data) {
            this.profile.firstName.value = data.firstName;
            this.profile.lastName.value = data.lastName;
            this.profile.email.value = data.email;
            this.profile.phone.value = data.phoneNumber;
            this.profile.company.value = data.company;
            this.profile.type.value = data.membershipRole;
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

