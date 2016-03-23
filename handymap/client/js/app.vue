<template>
<div id="app">
  <h1>{{ hello }}</h1>
  <router-view keep-alive transition transition-mode="out-in">
  </router-view>
</div>
</template>

<script type="text/javascript">

import store from './vuex/store'

export default {
  store,
  vuex: {
    getters: {
      hello: state => state.hello
    }
  }
}

</script>