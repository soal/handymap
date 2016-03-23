<template>
  <h1>{{ hello }} And from nested component!</h1>
</template>

<script>
export default {
  vuex: {
    getters: {
      hello: state => state.hello
    }
  }
}
</script>