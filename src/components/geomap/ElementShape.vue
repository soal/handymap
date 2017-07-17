<template>
<div>
  <layer v-for="shape of visibleShapes" :key="shape.properties.id"
        :sourceId.sync="shape.properties.id"
        :source.sync="shape"
        :layerId="shape.properties.id"
        :listenUserEvents="false"
        :type="shape.properties.type"
        :paint.sync="shape.properties.paint"
  >
  </layer>
</div>
</template>

<script>
  import { MglGeojsonLayer } from 'vue-mapbox';

  export default {
    name: 'ElementShape',
    components: {
      Layer: MglGeojsonLayer
    },
    props: ['element'],

    mounted() {
      let shapes = this.element.shapes_ids.map(id => {
        return this.$store.dispatch('fetchShape', id);
      });
      Promise.all(shapes).then(shapes => {
        this.$store.commit('addShapes', shapes);
      });
    },

    computed: {
      visibleShapes() {
        // TODO: filter by time
        let shapes = this.$store.getters.elementShapes(this.element.shapes_ids);
        // console.log('El: ', this.element.name, ' Shapes: ', shapes);
        return shapes;
      }
    }
  };
</script>

<style lang="scss"></style>
