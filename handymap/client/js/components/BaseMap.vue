<template>
  <div v-for="event in events">
    <b>{{ event.date }}</b>&nbsp;<span>{{ event.name }}</span>
  </div>
</template>


<script>

import _ from "lodash";
import Fact from "../actions/eventActions";

console.log(Fact)

export default {
  name: "BaseMap",
  vuex: {
    getters: {
      events: state => {
        var events = [];
        for (event of state.events) {
          let formatted = _.clone(event);
          formatted.date = `${event.date.day}.${event.date.month}.${event.date.year}`
          events.push(formatted);
        }
        return events;
      }
    },
    actions: _.extend(Fact.actions(), {})
  },
  ready() {
    this.get()
  }
}

</script>