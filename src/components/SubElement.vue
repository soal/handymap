<template lang="html">
  <div class="subelement">
    <h3><a href="javascript:;" @click="toggleDesc">{{element.label}}</a></h3>
    <div v-show="descShowed" class="description">
      <a href="javascript:;" @click="setCurrentElement(event, element.id)" v-link="{ name: 'element', params: { element: element.name } }">Перейти</a>
      <p>
        {{ element.description }}
      </p>
      <br>
    </div>
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
  vuex: {
    getters: {
      currentElementId: state => state.currentElementId
    },
    actions: {
      setCurrentElement({dispatch}, event, id) {
        dispatch("SET_CURRENT_ELEMENT_ID", id);
      }
    }
  },
  methods: {
    toggleDesc() {
      this.descShowed = !this.descShowed;
    }
  }
};
</script>

<style lang="scss">
</style>
