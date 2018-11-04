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
import NavigationBar from '../../components/NavigationBar.vue'
import ApiDriver from '../../ApiDriver'
import router from '../../router'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from '../../utils/CurrentUserValidation'
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
            router.push('/users/' + this.$route.params.userId + '/edit')
        },
        retrieveInformation() {
            let that = this;
            if (!this.$route.params.userId) {
                router.push('/')
            } else {    
                ApiDriver.User.get(this.$route.params.userId).then((response) => {
                    HttpResponse.then(response, (data) => {
                        that.populateData(data.data)
                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">Access Denied<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
                        }
                    })
                }).catch((errors) => {
                    this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the user information<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
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

