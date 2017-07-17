const handlers = {
  root: async store => {
    store.commit('setCurrentElement', null);
    await store.dispatch('fetchDicts');
    await store.dispatch('fetchRootScenario', store.state.dicts.rootScenario);
    await store.dispatch('fetchElements', store.state.rootScenario.context.dataset)
  },

  element: async (store, id) => {
    let element = await store.dispatch('fetchElement', id);
    store.commit('setCurrentElement', element.id);
  },

  scenario: async (store, name) => {
    await store.dispatch('putScenario', name);
    // store.state.scenario.contexts.map(async context => await store.dispatch('fetchElements', store.state.scenario.contexts.dataset))
    // await store.dispatch('fetchElements', store.state.scenario.contexts.dataset)
  }
}


export default function dataHandler(store) {
  store.subscribe(mutation => {
    if (mutation.type === 'route/ROUTE_CHANGED') {
      switch (mutation.payload.to.name) {
        case 'view_map':
          handlers.root(store);
          break;

        case 'element':
          handlers.element(store, mutation.payload.to.params.id);
          break;

        case 'scenario':
          handlers.scenario(store, mutation.payload.to.params.name);
          break;

        default:
          break;
      }
      return;
    }
  });
}
