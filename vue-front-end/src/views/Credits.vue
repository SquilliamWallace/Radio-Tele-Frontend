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
                },
                {
                    name: "Derek McClellan",
                    major: "Computer Science",
                    work: "Liked learning Vue.js and the instant gratification that comes with web development",
                    liked: "leading a team of talented people to work towards deployment and integration"
                },
                {
                    name: "David Henry",
                    major: "Computer Science",
                    work: "Liked playing with the scale model Radio Telescope",
                    liked: "being able to work on a great project with amazing people"
                },
                {
                    name: "Logan Ferree",
                    major: "Computer Science",
                    work: "Liked learning about Kotlin for the back-end software, and being able to break 75% of the unit tests",
                    liked: "learning new technologies and working on a large project"
                },
                {
                    name: "Felix Diaz",
                    major: "Computer Engineering",
                    work: "Liked working on the virtual reality telescope and planetarium, as well as creating the automated movement in C#",
                    liked: "Creating technology that can introduce people to the joys of radio astronomy and making Kerry's dreams come true"
                },
                {
                    name: "Joseph Hopkins",
                    major: "Computer Science",
                    work: "Liked developing the UI/UX of the application",
                    liked: "Being immersed in new and interesting technologies"
                },
                {
                    name: "Jason Porter",
                    major: "Computer Science",
                    work: "Liked developing a C# application that connects the internet to the hardware",
                    liked: "Implementing his team's work in iterative development cycles"
                },
                {
                    name: "Rathana Pim",
                    major: "Computer Science",
                    work: "Liked learning Kotlin and improving copying and pasting skills",
                    liked: "Working with great people and in multiple teams"
                },
                {
                    name: "Zack Henry",
                    major: "Computer Science",
                    work: "Liked implementing multiple appointment types on the front-end",
                    liked: "Getting to know and work with some really cool people"
                },
                {
                    name: "Jacob Majeski",
                    major: "Computer Science",
                    work: "Alpha Centauri",
                    liked: "Alpha Centauri"
                },
                {
                    name: "Ezra Moore",
                    major: "Computer Science",
                    work: "Alpha Centauri",
                    liked: "Alpha Centauri"
                },
                {
                    name: "Chris Garrety",
                    major: "Computer Science",
                    work: "Alpha Centauri",
                    liked: "Alpha Centauri"
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
