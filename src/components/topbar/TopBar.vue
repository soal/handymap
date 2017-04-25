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
        <span v-if="$route.name === 'intro'">{{ title }}</span>
        <span v-else>{{ shortTitle }}</span>
        <router-link :to="{ name: 'view_map' }"
                     v-if="$route.name === 'intro'">Map</router-link>
        <router-link :to="{ name: 'intro' }"
                     v-else>Intro</router-link>
      </b-link>
      <b-link class="global-search" @click="globalSearchVisible = !globalSearchVisible" v-if="$route.name !== 'intro'">Search</b-link>
      <div class="global-search-wrap" v-show="globalSearchVisible" v-if="$route.name !== 'intro'">
        <div class="global-search-box">
          <b-form-input type="text" placeholder="Search for scenarios, events, places and other"></b-form-input>
          <search-panel :visible="searchPanelVisible"></search-panel>
        </div>
      </div>
      <b-collapse is-nav id="nav_collapse" v-if="$route.name !== 'intro'">
        <b-nav is-nav-bar>
          <b-nav-item>
            <top-bar-project></top-bar-project>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'scenario', params: { name: 'second_punic_war' } }">Second Punic War</router-link>
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
  // TODO: Project —> Scenario –> Element as breadcrumbs
  // TODO: Icon for search link
  // TODO: Badges for project, scenario, event, place, region, persona
  import { mapState } from 'vuex';
  import TopBarProject from './TopBarProject.vue';
  import SearchPanel from './SearchPanel.vue';

  export default {
    name: 'TopBar',
    components: {
      TopBarProject,
      SearchPanel
    },

    data() {
      return {
        globalSearchVisible: false,
        searchPanelVisible: false
      };
    },

    computed: mapState({
      title: 'title',
      shortTitle: 'shortTitle'
    })
  };
</script>

<style lang="scss">
  .global-search-wrap {
    height: 100%;

    .global-search-box {
      position: absolute;
      height: 2.5rem;
      width: 80%;
    }
  }
</style>
