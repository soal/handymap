<template>
  <article>
    <h2><b>{{ currentElement.id }}</b> {{ currentElement.label }}</h2>
  </article>
</template>

<script>
import infoboxMixin from './infoboxMixin'

export default {
  mixins: [infoboxMixin],

  computed: {
    currentElement() { return this.$store.getters.currentElement }
  }
};
</script>

<style lang="scss"></style>

