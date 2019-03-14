<template>
<div>
    <v-toolbar class="bar-style" id="titleBar">
      <v-toolbar-side-icon @click="showDrawer=!showDrawer; loadStore()"></v-toolbar-side-icon>    
      <v-toolbar-title class="title-style" @click="homeRedirect">YCAS Radio Telescope</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon dark class="help-style" @click="toggleInfo">help_outline</v-icon>
      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn @click="viewProfile">Profile</v-btn>
          <v-btn @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- Define drawer menu and populate it with items-->
    <v-navigation-drawer class = "nav-drawer" :temporary=true :floating=true :hide-overlay=true v-model="showDrawer">
        <v-list>
            <v-list-tile v-for = "item in items"
            :key = "item.title"
            router
            :to = "item.path"
            color = "white">
                <v-list-tile-title color = "white">{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
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
