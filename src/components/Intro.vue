<template>
  <div id="intro" class="row">
    <div class="col">
      <b-jumbotron :header="title" fluid lead="Welcome to Historyflow preview!"></b-jumbotron>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "Intro",

    computed: mapState([
      "title",
      "selectedScenarios"
    ])
  };
</script>

<style lang="scss">
</style>
