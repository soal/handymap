<template>
  <article>
    <p>
      {{ element.text }}
    </p>
  </article>
</template>

<script>

export default {
  name: 'ElementArticle',

  computed: {
    element() { return this.$store.getters.currentElement  }
  }
};
</script>

<style lang="scss"></style>

