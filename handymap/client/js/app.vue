<template>
<div id="app">
  <h1>{{ hello }}</h1>
  <router-view keep-alive>
  </router-view>
</div>
</template>

<script>

import store from "./storage/store";
import BaseMap from "./components/BaseMap.vue";

export default {
  store,
  components: {
    BaseMap
  }
}

</script>