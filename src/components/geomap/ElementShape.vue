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
  import { MglGeojsonLayer } from 'vue-mapbox';
  import { API_ROOT } from '../../config';
  import api from '../../api';

  export default {
    name: 'ElementShape',
    components: {
      Layer: MglGeojsonLayer
    },
    props: ['element'],

    mounted() {
      this.element.shapes_ids.forEach(id => {
        this.$store.dispatch('fetchShape', id);
      });
    },

    computed: {
      visibleShapes() {
        // TODO: filter by time
        return this.$store.getters.elementShapes(this.element.shapes_ids);
      }
    }

  }
</script>

<style lang="scss"></style>
