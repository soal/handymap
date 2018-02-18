<template>
  <v-toolbar
    class="topbar"
    color="primary"
    dark
    dense
    float
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{ name: 'scenario', params: { scenarioName: 'second_punic_war' } }">
          Second Punic War
      </v-btn>
      <!--<v-btn flat>Link Two</v-btn>-->
      <!--<v-btn flat>Link Three</v-btn>-->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapState } from 'vuex'

export default {
    name: 'TopBar',

    computed: mapState({
      title: 'title',
      shortTitle: 'shortTitle'
    })
  }
</script>

<style>
.topbar {
  position: relative;
  z-index: 2;
}
</style>
