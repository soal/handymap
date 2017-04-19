import { union, unionBy, isArray } from 'lodash';

export default {
  setScenario(state, scenario) {
    state.scenario = scenario;
  },

  setElements(state, elements) {
    state.elements = unionBy(state.elements, isArray(elements) ? elements : [elements], 'id');
  },
  selectElement(state, id) {
    state.selectedElementsIds = union(state.selectedElementsIds, [id], 'id');
  },
  setCurrentElement(state, id) {
    state.currentElementId = id;
  },

  setRootContext(state, context) {
    state.rootContext = context;
  },
  addContext(state, context) {
    state.contexts.push(context);
  },

  setDicts(state, dicts) {
    state.dicts = dicts;
  },

  addShape(state, shape) {
    state.shapes.push(shape);
  }
};
