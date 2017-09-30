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
};
</script>

<style lang="scss" scoped>
  #infobox {
    background-color: #fff;
    position: absolute;
    height: 100vh;
    left: 0;
    overflow: hidden;
    top: 0;
    width: 30vw;
    z-index: 1;

    .infobox-wrap {
      padding: 60px 20px;
    }
  }
</style>
