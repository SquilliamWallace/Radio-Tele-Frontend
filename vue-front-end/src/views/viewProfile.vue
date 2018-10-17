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
                    <div class = "headline">{{ profile.firstName }} {{profile.lastName}}</div>
               </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card class = "elevation-0" color = "transparent">
                    <v-divider></v-divider>
                    <div class = "headline text-xs-left">Email <v-icon>email</v-icon></div>
                    <div id = "profileInfo" class = "text-xs-left">{{ profile.email }}</div>
                    <v-divider></v-divider>
                    <div class = "headline text-xs-left">Phone <v-icon>phone</v-icon></div>
                    <div id = "profileInfo" class = "text-xs-left">{{ profile.phone }}</div>
                    <v-divider></v-divider>
                    <div class = "headline text-xs-left">Company  <v-icon>business</v-icon></div>
                    <div id = "profileInfo" class = "text-xs-left">{{ profile.company }}</div>
                    <v-divider></v-divider>
                    <div class = "headline text-xs-left">Membership <v-icon>person</v-icon></div>
                    <div id = "profileInfo" class = "text-xs-left">{{ profile.type }}</div>
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
import router from '../router'
export default {
    name: "ViewProfile",
    data() {
        return {
            profile: {
                firstName: "Patrick",
                lastName: "Star",
                email: "patStar@gmail.com",
                phone: "717-887-4339",
                company: "Crusty Crab",
                type: "student"
            }
        }
    },
    components: {
      NavigationBar
    },
    methods: {
        editRedirect() {
            router.push('/editProfile')
        }
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

