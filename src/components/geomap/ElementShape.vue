<template>
<div>
  <layer v-for="shape of visibleShapes" :key="shape.id"
        :sourceId="shape.id"
        :source="shape.url"
        :layerId="shape.id"
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

    computed: {
      visibleShapes() {
        // TODO: filter by time
        // console.log(this.element.shapes_ids)
        return this.element.shapes_ids.map(shape => {
          return {id: shape+'', url: `${API_ROOT}/shapes/${shape}`};
        });
      }
    }

  }
</script>

<style lang="scss"></style>
