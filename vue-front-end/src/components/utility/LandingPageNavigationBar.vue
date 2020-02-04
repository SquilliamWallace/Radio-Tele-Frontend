<template>
<div>
    <v-toolbar class="bar-style" id="titleBar">
      <v-toolbar-side-icon @click="showDrawer=!showDrawer; loadStore()"></v-toolbar-side-icon>    
      <v-toolbar-title class="title-style" @click="homeRedirect">YCAS Radio Telescope</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon dark class="help-style" @click="toggleFeedback">question_answer</v-icon>
      <v-icon dark class="help-style" @click="toggleInfo">help_outline</v-icon>
      <v-toolbar-items class="hidden-sm-and-down">
          <!-- New text links can be added to the navbar here, must be accompanied by a function with the router pushing to an appropriate url-->
          <v-btn @click="credits">Credits</v-btn>
          <v-btn @click="contact">Contact Us</v-btn>
          <v-btn @click="viewProfile">Profile</v-btn>
          <v-btn @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- The help component, which displays information and instructions on the current page in the application-->
    <v-dialog dark v-model="showInfo" max-width="50%">
         <v-card class="help-modal-style">
          <v-card-title style="justify-content: center;">
            <h2>{{$store.state.currentPage}}</h2>
          </v-card-title>
          <v-card-text>
            <pre>{{$store.state.information}}</pre>
          </v-card-text>
         </v-card>
    </v-dialog>
    <v-dialog dark v-model="showFeedback" max-width="50%">
        <v-card class="help-modal-style">
            <v-card-title>Submit Feedback</v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="data.name"
                    label="Name (Optional)"
                ></v-text-field>
                <v-text-field
                    v-model="data.priority"
                    label="Priority"
                    type="number"
                    hint="Priority must be between 1-10, 10 denotes highest priority"
                    persistent-hint
                ></v-text-field>
                <v-textarea
                    v-model="data.comments"
                    label="Comments"
                ></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="!formIsValid" @click="submitFeedback" color="primary">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
</template>

<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver'
export default {
    name: 'NavigationBar',
    data() {
        return {
            showDrawer: false,
            showInfo: false,
            showFeedback: false,
            data: {
                name: "",
                priority: 1,
                comments: ""
            },
            items: [
              { title: 'Scheduling Calendar', icon: 'dashboard', path: '/scheduler' },
              { title: 'Search Appointments', path: '/appointments/search' },
              { title: 'Public Appointments', path: '/appointments/public' },
            ]
        }
    },
    methods: {
        homeRedirect(){
            if (this.$store.state.currentUserId){
                router.push('/home')
            }
            else{
                router.push('/')
            }
        },
        submit() {
            ApiDriver.login(this.data);
        },
        credits() {
            router.push('/credits')
        },
        contact() {
            router.push('/contactus')
        },
        viewProfile() {
            router.push('/users/' + this.$store.state.currentUserId + '/view')
        },
        logout() {
            ApiDriver.logout();
            this.$store.commit("logout");
            router.push('/');
        },
        toggleInfo() {
            this.showInfo = !this.showInfo;
        },
        toggleFeedback() {
            this.showFeedback = !this.showFeedback;
        },
        loadStore() {
            // On clicking the drawer, add two buttons that require data from the store to function
            if(this.items.length === 3){
                this.items.push({ title: 'Completed Appointments', path: '/users/' + this.$store.state.currentUserId + '/appointments/completed' })
                this.items.push({ title: 'Future Appointments', path: '/users/' + this.$store.state.currentUserId + '/appointments/future' })
            }
            
            // On clicking the drawer, check if the user is an Admin
            if(this.$store.state.isAdmin && this.items.length < 6){
                this.items.push({ title: 'Administration', path: '/admin' })
            }
        },
        submitFeedback() {
            this.data.priority = parseInt(this.data.priority);
            ApiDriver.feedback(this.data).then((response) => {
                this.$swal({
                    title: '<span style="color:#f0ead6">Feedback Submitted!<span>',
                    html: '<span style="color:#f0ead6">Your feedback has been submitted to the developers. Thank you.<span>',
                    type: 'success',
                    background: '#302f2f'
                }).then(response => {
                    this.showFeedback = false;
                })
            })
        }
    },
    computed: {
      formIsValid () {
        return (
          this.data.priority <=10 &&
          this.data.priority>=1 &&
          this.data.comments
        )
      }
    }
    
}
</script>

<style scoped>
.title-style{
    cursor: pointer;
}
.bar-style{
    width: 100%;
}
.nav-drawer{
    max-height:320px !important;
    position: absolute;
    margin-top: 64px !important;
    z-index: 99 !important;
}
.help-style{
    padding-right: 20px;
    cursor: pointer;
}
.help-modal-style{
    padding: 20px;
}
</style>
