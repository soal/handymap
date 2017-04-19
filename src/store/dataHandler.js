
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
    let context = await store.dispatch('fetchScenario', name);
    store.commit('setScenario', context);
  }
}


export default function dataHandler(store) {
  store.subscribe(mutation => {
    if (mutation.type === 'router/ROUTE_CHANGED') {
      switch (mutation.payload.to.name) {
        case 'view_map':
          handlers.root(store);
          break;

        case 'element':
          handlers.element(store, mutation.payload.to.params.id);
          break;

        case 'context':
          handlers.context(store, mutation.payload.to.params.id);
          break;

        default:
          break;
      }
      return;
    }
  });
}
