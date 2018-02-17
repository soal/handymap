<template>
<v-app>
  <v-content>
    <v-container id="app-container" fluid wrap>
      <v-layout>
        <v-flex>
          <top-bar></top-bar>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import { mapState } from 'vuex'
import TopBar from '@/components/TopBar.vue'

export default {
  name: 'App',
  components: {
    TopBar
  },

  methods: {
    clearMap() {
      this.$store.commit('ELEMENS_SET_CURRENT', null)
    }
  }
}
</script>

<style>
body {
  height: 100%;
  min-height: 100%;
}
#app-container {
  padding: 0;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
} */
</style>
