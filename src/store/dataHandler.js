
const handlers = {
  root: async store => {
    store.commit('setCurrentElement', null);
    await store.dispatch('fetchDicts');
    await store.dispatch('fetchRootContext', store.state.dicts.root_context);
    await store.dispatch('fetchElements', store.state.rootContext.dataset)
  },

  element: async (store, id) => {
    let element = await store.dispatch('fetchElement', id);
    store.commit('setCurrentElement', element.id);
  },

  context: async (store, id) => {
    let context = await store.dispatch('fetchContext', id);
    store.commit('setContext', context);
  }
}


export default function dataHandler(store) {
  store.subscribe(mutation => {
    if (mutation.type === 'router/ROUTE_CHANGED') {
      // console.log(mutation);
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
    }
  });
}
