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

  // single element getters
  isElementSelected: state => id => id in state.selectedElements.map(el => el.id),
  infoFields: () => (element, context) => {
    element.info.map(field => {
       return context.info_fields.indexOf(field.name) !== -1 ? field : undefined
    });
  },

  selectedElements: state => state.elements.filter(el => el.id in state.selectedElementsIds),

  currentElement: (state, getters) => getters.queryElement(state.currentElementId),

  commonDataset: (state, getters) => {
    let allIds = uniqBy(
      [ state.rootContext.rootElement,
        ...state.rootContext.dataset,
        ...state.contexts.map(context => context.rootElement),
        ...state.contexts.map(context => context.dataset)
      ]);

    return getters.queryElements(allIds);
  }
};
