<template>
<div>
  <layer v-for="shape of visibleShapes" :key="shape.properties.id"
        :sourceId.sync="shape.properties.id"
        :mapId="mapId"
        :map.sync="map"
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
    props: ['element', 'mapId', 'map'],

    created() {
      console.log('HELLO SHAPE');
    },

    mounted() {
      let shapes = this.element.shapes_ids.map(id => {
        return this.$store.dispatch('fetchShape', id);
      });
      Promise.all(shapes).then(shapes => {
        this.$store.commit('addShapes', shapes);
      });
      console.log(this)
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
