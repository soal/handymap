<template>
  <article>
    <h2><b>{{ currentElement.id }}</b> {{ currentElement.label }}</h2>
  </article>
</template>

<script>

export default {
  computed: {
    currentElement() { return this.$store.getters.currentElement || {} }
  }
}
</script>
