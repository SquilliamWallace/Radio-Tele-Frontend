<template>
  <v-app dark>
  <div id="app">
      <router-link :to="{ name: 'home'}">Home</router-link>
      <router-link :to ="{ name: 'login'}">Login</router-link>
      <router-link to="/about">About</router-link>
      <router-view></router-view>
  </div>
  </v-app>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
