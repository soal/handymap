<template>
  <div id="infobox" class="hidden-sm-down" v-if="currentElement.id">
    <div class="infobox-wrap">
      <h2><b>{{ currentElement.id }}</b> {{ currentElement.label }}</h2>
      <router-view name="infobox"></router-view>
    </div>
  </div>
</template>

<script>
import ElementsList from "./ElementsList.vue";
import ElementArticle from "./ElementArticle.vue";

export default {
  name: "InfoBox",
  components: {
    ElementArticle,
    ElementsList
  },

  props: {
    currentElement: {
      type: Object,
      default() { return {}; }
    }
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
