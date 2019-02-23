<template>
  <v-app :dark="goDark">
    <div id="app">
        <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      goDark: true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.v-parallax {
  height: 100%
}
</style>
