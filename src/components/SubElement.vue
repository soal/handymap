<template lang="html">
  <h3><a href="javascript:;" @click="toggleDesc">{{element.label}}</a></h3>
  <div v-show="descShowed" class="description">
    {{ element.description }}
    <br>
    <a href="javascript:;" v-link="{ path: element.name, params: { id: element.id } }">Полное описание</a>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      descShowed: false
    };
  },
  props: ["element"],
  methods: {
    toggleDesc() {
      this.descShowed = !this.descShowed;
    }
  }
};
</script>

<style lang="scss">
</style>
