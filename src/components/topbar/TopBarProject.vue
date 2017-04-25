<template>
  <div class="top-bar-project">
    <router-link :to="{ name: 'view_map' }">{{ project.label }}</router-link>
  </div>
</template>

<script>
  export default {
    name: 'TopBarProject',

    computed: {
      project() { return this.$store.state.project; }
    }
  }
</script>

<style lang="scss"></style>
