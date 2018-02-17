<template>
  <v-toolbar
    class="topbar"
    color="primary"
    dark
    dense
    float
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
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
