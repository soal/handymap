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

  setRootScenario(state, rootScenario) {
    state.rootScenario = rootScenario;
    let scenario = Object.assign({}, rootScenario, { dirty: false, contexts: [rootScenario.context] });
    delete scenario.context;
    state.scenario = scenario;
  },
  addContext(state, context) {
    state.contexts.push(context);
  },

  setDicts(state, dicts) {
    state.dicts = dicts;
  },

  addShape(state, shape) {
    state.shapes.push(shape);
  },
  addShapes(state, shapes) {
    state.shapes = unionBy(state.shapes, shapes, 'properties.id');
  }
};
