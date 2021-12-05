<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <v-container fluid grid-list-lg>
            <v-layout align-center wrap>
                <v-flex xs6 v-for="dev in devInfo" :key="dev.id">
                    <v-card justify-center>
                        <v-card-title class="headline">{{dev.name}} : {{dev.major}}</v-card-title>
                        <v-card-text class="align-left subheading font-weight-thin">Team: {{dev.work}}</v-card-text>
                        <v-card-text class="align-left subheading font-weight-thin">Enjoyed:  {{dev.liked}}</v-card-text>
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
                    name: "Alyssa McDevitt",
                    major: "Computer Science",
                    work: "Mobile App",
                    liked: "Working with AWS, learning the quirks of React Native, learning more about astronomy."
                },
                {
                    name: "Andrew Georgiou",
                    major: "Computer Science",
                    work: "Control Room",
                    liked: "Control Room"
                },
                {   name: "Anthony Beddia",
                    major: "Computer Science",
                    work: "Front-end, Back-end, AWS",
                    liked: "Getting real world experiences and working with actual clients"
                },
                {
                    name: "Brett Kearny",
                    major: "Computer Science",
                    work: "Control Room",
                    liked: "Control Room"
                },
                {
                    name: "Chris Garrety",
                    major: "Computer Science",
                    work: "Alpha Centauri",
                    liked: "Alpha Centauri"
                },
                {
                    name: "Cody Spath",
                    major: "Computer Science",
                    work: "Software Lead / Control Room",
                    liked: "Learning about and incorporating new technologies."
                },
                {
                    name: "Dakota Hilbert",
                    major: "Computer Science",
                    work: "Web Front End Development",
                    liked: "Learning Vue.js, Node.js and working on a large team."
                },
                {
                    name: "Dan Palmieri",
                    major: "Computer Science",
                    work: "Control Room Lead",
                    liked: "Learning Vue.js, Node.js and working on a large team."
                },
                {
                    name: "Darin Gordon",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "David Henry",
                    major: "Computer Science",
                    work: "Liked playing with the scale model Radio Telescope",
                    liked: "Being able to work on a great project with amazing people"
                },
                {
                    name: "Derek McClellan",
                    major: "Computer Science",
                    work: "Liked learning Vue.js and the instant gratification that comes with web development",
                    liked: "Leading a team of talented people to work towards deployment and integration"
                },
                {
                    name: "Devin Retzlaff",
                    major: "Computer Science",
                    work: "The user interface",
                    liked: "Working on a project in which I had a lot of helpful previous work experience"
                },
                {
                    name: "Dylan Bieber",
                    major: "Computer Science",
                    work: "Mobile App",
                    liked: "Mobile App"
                },
                {
                    name: "Ed Nardo",
                    major: "Computer Science",
                    work: "Mobile App",
                    liked: "Unlisted"
                },
                {
                    name: "Ezra Moore",
                    major: "Computer Science/The Spice™",
                    work: "Liked working with the Hololens and HTC Vive",
                    liked: "Making the telescope fly..."
                },
                {
                    name: "Felix Diaz",
                    major: "Computer Engineering",
                    work: "Liked working on the virtual reality telescope and planetarium, as well as creating the automated movement in C#",
                    liked: "Creating technology that can introduce people to the joys of radio astronomy and making Kerry's dreams come true"
                },
                {
                    name: "Garrett Ruths",
                    major: "Computer Science",
                    work: "Liked learning in the unity engine, despite the headaches it caused",
                    liked: "Being able to work in a large scale team environment"
                },
                {
                    name: "Greg Plachno",
                    major: "Computer Science",
                    work: "Simulation",
                    liked: "nModBus4"
                },
                {
                    name: "Jack Anderson",
                    major: "Computer Science / Mathematics",
                    work: "Control Room",
                    liked: "Control Room"
                },
                {
                    name: "Jacob Majeski",
                    major: "Computer Science",
                    work: "Alpha Centauri",
                    liked: "Alpha Centauri"
                },
                {
                    name: "Jacob Minor",
                    major: "Electrical Engineering",
                    work: "ECE Lead",
                    liked: "ECE Lead"
                },
                {
                    name: "Jason Constantine",
                    major: "Computer Science",
                    work: "Mobile App",
                    liked: "Learning a new language and learning about API's"
                },
                {
                    name: "Jason Pierpont",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Jason Porter",
                    major: "Computer Science",
                    work: "Liked developing a C# application that connects the internet to the hardware",
                    liked: "Implementing his team's work in iterative development cycles"
                },
                {
                    name: "Jessie Furey",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Joel Horne",
                    major: "Computer Science",
                    work: "The backend application",
                    liked: "Being thrown into a project I knew nothing about written in a language I didn't know running in an almost esoteric framework and climbing my way out."
                },
                {
                    name: "Jon Myer",
                    major: "Computer Science",
                    work: "General",
                    liked: "General"
                },
                {
                    name: "Jon Steck",
                    major: "Computer Science",
                    work: "Virtual Reality and Simulation Lead",
                    liked: "Virtual Reality and Simulation Lead"
                },
                {
                    name: "Joseph Hopkins",
                    major: "Computer Science",
                    work: "Liked developing the UI/UX of the application",
                    liked: "Being immersed in new and interesting technologies"
                },
                {
                    name: "Joseph Landau",
                    major: "Computer Science",
                    work: "The backend application and infrastructure",
                    liked: "Working with the other developers and setting up the control room server"
                },
                {
                    name: "Joshua Sowa",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Karl Andrand",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Kate Kennelly",
                    major: "Computer Science / Mathematics",
                    work: "Control Room Application",
                    liked: "Being able to see each step of the process from end to end and understanding how it all works together"
                },
                {
                    name: "Kyle Eidson",
                    major: "Computer Science",
                    work: "Control room application",
                    liked: "Integrating the project with a multitude of other systems and seeing them all interact"
                },
                {
                    name: "Logan Ferree",
                    major: "Computer Science",
                    work: "Liked learning about Kotlin for the back-end software, and being able to break 75% of the unit tests",
                    liked: "Learning new technologies and working on a large project"
                },
                {
                    name: "Lucas Gartrell",
                    major: "Computer Science",
                    work: "Back-End",
                    liked: "Working in a team environment"
                },
                {
                    name: "Marcos Rivera",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Marie Kiley",
                    major: "Computer Science",
                    work: "Web front end development, focusing on extending appointment functionality",
                    liked: "Being part of something big, working with a large team, and succeeding at difficult objectives"
                },
                {
                    name: "Nick Vandemark",
                    major: "Computer Engineering/Computer Science",
                    work: "Liked integrating the control room software with all the hardware",
                    liked: "Working with a bunch of smart people"
                },
                {
                    name: "Nolan Hamilton",
                    major: "Computer Science",
                    work: "Web front end development, focusing on administrator pages",
                    liked: "Learning Vue.js, Node.js, and back end API integration"
                },
                {
                    name: "Patrick Nelson",
                    major: "Computer Science",
                    work: "Control room, main focus on overrides",
                    liked: "Learning the control room software, troubleshooting, and working with an awesome team"
                },
                {
                    name: "Philip Nelson",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Quintin Herb",
                    major: "Computer Science",
                    work: "Back-end, AWS",
                    liked: "Working with the team and having a great deal of responsibility"
                },
                {
                    name: "Rathana Pim",
                    major: "Computer Science",
                    work: "Liked learning Kotlin and improving copying and pasting skills",
                    liked: "Working with great people and in multiple teams"
                },
                {
                    name: "Richard Hopkins",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Thomas Albert",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Travis Jones",
                    major: "Computer Engineering",
                    work: "Liked working on the control room software",
                    liked: "The interdisciplinary coordination"
                },
                {
                    name: "Dakota Hilbert",
                    major: "Computer Science",
                    work: "Control Room",
                    liked: "Control Room"
                },
                {
                    name: "William Taylor",
                    major: "Unlisted",
                    work: "Unlisted",
                    liked: "Unlisted"
                },
                {
                    name: "Zack Henry",
                    major: "Computer Science",
                    work: "Liked implementing multiple appointment types on the front-end",
                    liked: "Getting to know and work with some really cool people"
                },
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
