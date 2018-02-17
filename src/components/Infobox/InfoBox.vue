<template>
  <div id="infobox" class="hidden-sm-down" v-if="currentElement && currentElement.id">
    <div class="infobox-wrap">
      <router-view name="infobox"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InfoBox',

  computed: {
    currentElement() { return this.$store.getters.currentElement }
  }
}
</script>

<style scoped>
</style>
