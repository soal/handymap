import uniqBy from 'lodash';

export default {

  queryElement: state => {
    return (value, selector='id') => state.elements.find(element => element[selector] === value);
  },
  queryElements: state => {
    return (value, selector='id') => {
      if (value instanceof Array) {
        return state.elements.filter(element => value.indexOf(element[selector]) !== -1)
      }
      return state.elements.filter(element => element[selector] === value)
    };
  },

  isElementSelected: state => id => id in state.selectedElements.map(el => el.id),

  selectedElements: state => state.elements.filter(el => el.id in state.selectedElementsIds),

  currentElement: (state, getters) => getters.queryElement(state.currentElementId),

  commonDataset: (state, getters) => {
    let dataset = [];

    let allIds = uniqBy(
      [ state.rootContext.rootElement,
        ...state.rootContext.dataset,
        ...state.contexts.map(context => context.rootElement),
        ...state.contexts.map(context => context.dataset)
      ]);

    dataset = getters.queryElements(allIds);

    return dataset;
  }
};
