<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <v-container fluid grid-list-lg>
            <v-layout align-center wrap>
                <v-flex xs6 v-for="dev in devInfo" :key="dev.id">
                    <v-card justify-center>
                        <v-card-title class="headline">{{dev.name}} : {{dev.major}}</v-card-title>
                        <v-card-text class="align-left subheading font-weight-thin">{{dev.work}}</v-card-text>
                        <v-card-text class="align-left subheading font-weight-thin">One of the most interesting parts of the project was {{dev.liked}}</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import NavigationBar from "../components/utility/NavigationBar.vue";
export default {
    title: "Radio Telescope 1.1.0",
    name: "Credits",
    components: {
        NavigationBar
    },
    data() {
        return {
            devInfo: [
                {
                    name: "Travis Jones",
                    major: "Computer Engineering",
                    work: "Liked working on the control room software",
                    liked: "the interdisciplinary coordination"
                },
                {
                    name: "Nick Vandemark",
                    major: "Computer Engineering/Computer Science",
                    work: "Liked integrating the control room software with all the hardware",
                    liked: "working with a bunch of smart people"
                },
                {
                    name: "Cody Spath",
                    major: "Computer Science",
                    work: "Liked integration between the back-end, front-end and control room, as well as learning about deploying an application to production",
                    liked: "learning about and incorporating new technologies"
                },
                {
                    name: "Garrett Ruths",
                    major: "Computer Science",
                    work: "Liked learning in the unity engine, despite the headaches it caused",
                    liked: "being able to work in a large scale team environment"
                }
            ]
        }
    },
    mounted() {
        this.$store.commit("updateInfo", {page: "Credits", info: "This page serves as a thank you to all current and former developers, both on\n the software and hardware sides of the project."})
    }
}
</script>

<style scoped>
.align-left{
    text-align: left
}
</style>
