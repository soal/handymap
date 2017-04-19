<template>
<div>
  <layer v-for="shape of visibleShapes" :key="shape.properties.id"
        :sourceId="shape.properties.id"
        :source="shape"
        :layerId="shape.properties.id"
        :listenUserEvents="false"
  >
  </layer>
</div>
</template>

<script>
  import {compact} from 'lodash';
  import { MglGeojsonLayer } from 'vue-mapbox';
  // import { API_ROOT } from '../../config';
  // import api from '../../api';

  export default {
    name: 'ElementShape',
    components: {
      Layer: MglGeojsonLayer
    },
    props: ['element'],

    data() {
      return {
        visibleShapes: []
      }
    },
    mounted() {
      let shapes = this.element.shapes_ids.map(id => {
        return this.$store.dispatch('fetchShape', id);
      });
      Promise.all(shapes).then(shapes => {
        // debugger
        this.$store.commit('addShapes', shapes);
        // this.visibleShapes = compact(this.$store.getters.elementShapes(this.element.shapes_ids));
      })
    },

    computed: {
      visibleShapes() {
        // TODO: filter by time
        let shapes = compact(this.$store.getters.elementShapes(this.element.shapes_ids))
        // let shapes = compact(this.$store.state.shapes.filter(shape => this.element.shapes_ids.indexOf(+shape.properties.id)));
        debugger
        return shapes;
      }
    }

  }
</script>

<style lang="scss"></style>
