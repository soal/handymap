<template>
  <div class="row">
    <b-navbar toggleable
              fixed
              type="inverse"
              variant="primary"
              class="col">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand"
              to="#">
        <span>{{ title }}</span>
        <router-link :to="{ name: 'view_map' }"
                     v-if="$route.name === 'intro'">Map</router-link>
        <router-link :to="{ name: 'intro' }"
                     v-else>Intro</router-link>
      </b-link>
      <b-collapse is-nav
                  id="nav_collapse"
                  v-if="$route.name !== 'intro'">
        <b-nav is-nav-bar>
          <!--<b-nav-item>
            <router-link :to="{ name: 'element', params: { id: 1 } }">Rome</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'element', params: { id: 7 } }">Carthago</router-link>
          </b-nav-item>-->
          <b-nav-item>
            <router-link :to="{ name: 'scenario', params: { name: 'second_punic_war' } }">Second Punic War</router-link>
          </b-nav-item>
          <!--<b-nav-item>
            <b-button size="sm"
                      variant="secondary"
                      @click="clearMap()">Clear map</b-button>
          </b-nav-item>-->
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'TopBar',

    computed: mapState({
      title: 'title',
      shortTitle: 'shortTitle'
    })
  }
</script>

<style lang="scss"></style>
