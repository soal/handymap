<template>
  <div id="infobox">
    <div class="infobox-wrap">
      <slot />
      <!-- <router-view name="infobox"></router-view> -->
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
