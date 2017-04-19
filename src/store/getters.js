import {uniq, flatten, compact} from 'lodash';

export default {

  queryElement: state => {
    return (value, selector='id') => state.elements.find(element => element[selector] === value);
  },
  queryElements: state => {
    return (value, selector='id') => {
      return state.elements.filter(element => value.indexOf(element[selector]) !== -1)
    };
  },

  // single element getters
  isElementSelected: state => id => id in state.selectedElements.map(el => el.id),
  infoFields: () => (element, context) => {
    element.info.map(field => {
      return context.info_fields.indexOf(field.name) !== -1 ? field : undefined
    });
  },
  elementShapes: state => {
    return ids => {
      return state.shapes.filter(shape => ids.indexOf(+shape.properties.id));
    }
  },

  selectedElements: state => state.elements.filter(el => el.id in state.selectedElementsIds),

  currentElement: (state, getters) => getters.queryElement(state.currentElementId),

  commonDataset: (state, getters) => {
    let rootDataset = state.rootScenario.context.dataset ? state.rootScenario.context.dataset : [];
    let allIds = uniq(
      compact([
        state.rootScenario.context.rootElement,
        ...rootDataset,
        ...state.scenario.contexts.map(context => context.rootElement),
        ...flatten(state.scenario.contexts.map(context => context.dataset))
      ])
    );
    // debugger
    return getters.queryElements(allIds);
  }
};
