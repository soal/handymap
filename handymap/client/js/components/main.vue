<template>
  <h1>{{ hello }}</h1>
</template>

<script type="text/javascript">

export default {
  // components: {},
  vuex: {
    getters: {
      hello: state => state.hello
    }
  },
}

</script>