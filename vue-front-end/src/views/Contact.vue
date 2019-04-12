<template>
<div>
    <navigation-bar></navigation-bar>
    <v-card>
        <v-card-title class="title font-weight-light">Contact Us</v-card-title>
        <v-card-text class="headline font-weight-bold">If you wish to submit feedback to the developers, click the speech bubble icon in the navigation bar. For other inquiries, or general information on the York County Astronomical Society, please send an email to info@astroyork.com.</v-card-text>
        <v-layout justify-center>
            <v-img src="../../public/YCAS2018b_nobackground.png"
            max-width="400"
            max-height="600"
            ></v-img>
        </v-layout>
        <v-card-text class="headline font-weight-bold">Thank you for using the YCAS Radio Telescope Web Application!</v-card-text>
    </v-card>
</div>
</template>

<script>
import NavigationBar from "../components/utility/NavigationBar.vue";
export default {
    title: "Radio Telescope 1.1.0",
    name: "Contact",
    components: {
        NavigationBar
    }
}
</script>

<style scoped>

</style>
