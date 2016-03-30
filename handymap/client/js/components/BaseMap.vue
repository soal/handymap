<template>
  <div v-for="fact in facts">
    <b>{{ fact.date }}</b>&nbsp;<span>{{ fact.name }}</span>
  </div>
</template>


<script>


import factActions from "../actions/factActions";

export default {
  name: "BaseMap",
  vuex: {
    getters: {
      facts: state => {
        var facts = [];
        for (let fact of state.facts) {
          let formatted = _.clone(fact);
          formatted.date = `${fact.date.day}.${fact.date.month}.${fact.date.year}`
          facts.push(formatted);
        }
        return facts;
      }
    },
    actions: Object.assign(
      factActions,
      {}
    )
  },
  ready() {
    this.get();
  }
}

</script>
