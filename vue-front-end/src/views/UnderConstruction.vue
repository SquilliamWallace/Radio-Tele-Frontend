<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <h1 class="text-style">This page is currently under construction</h1>
        <h3 class="text-style">Please be patient while we implement the necessary features</h3>
        <img class="image-style" src=https://ak8.picdn.net/shutterstock/videos/13288688/thumb/1.jpg>
    </v-app>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
export default {
    title: "Radio Telescope 1.0.0",
    name: "UnderConstruction",
    components: {
        NavigationBar
    }
}
</script>

<style scoped>
.text-style{
    color: #f0ead6;
}
.image-style{
    padding-top: 50px;
    padding-left: 200px;
    padding-right: 200px;
}
</style>

