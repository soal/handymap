import { union, unionBy, isArray } from "lodash";

export default {
  /**
   * Add scenario or array of scenarios in state's scenarios list.
   * Scenarios kepts unique tracked by it's ids. If ids is equal new objects replaces old ones.
   *
   * @param {Object} state state instance
   * @param {Object[] | {}} scenario scenario or array of scenarios
   */
  setScenario(state, scenario) {
    state.scenario = scenario;
  },

  /**
   * Sets root context.
   *
   * @param {Object} state state instance
   * @param {Object} context context to set
   */
  setRootScenario(state, scenario) {
    state.rootScenario = scenario;
  },

  addContextData(state, context) {
    let merged = { ...state.currentContext };
    merged.rootElements.push(context.rootElement);
    merged.info_fields = union(state.currentContext.info_fields, context.info_fields);
    merged.start_date = state.currentContext.start_date > context.start_date ? context.start_date : state.currentContext.start_date;
    merged.end_date = state.currentContext.end_date < context.end_date ? context.end_date : state.currentContext.end_date;
    merged.elements_types = union(state.currentContext.elements_types, context.elements_types);
    merged.links_types = union(state.currentContext.links_types, context.links_types);
    merged.additional_ids = union(state.currentContext.additional_ids, context.additional_ids);
    merged.bboxes = union(state.currentContext.bboxes, [context.bbox]);
    merged.weigth = state.currentContext.weigth > context.weigth ? state.currentContext.weigth : context.weight;

    state.currentContext = merged;
  },
  /**
   * Add element or array of elements in state's elements list.
   * elements kepts unique tracked by it's ids. If ids is equal new objects replaces old ones.
   *
   * @param {Object} state state instance
   * @param {Object[] | {}} element element or array of elements
   */
  setElements(state, elements) {
    state.elements = unionBy(state.elements, isArray(elements) ? elements : [elements], "id");
  },

  /**
   * Add elemnt in list of selected elements
   *
   * @param {Object} state
   * @param {Object} element
   */
  selectElement(state, id) {
    state.selectedElementsIds = union(state.selectedElementsIds, [id], "id");
  },
  setCurrentElement(state, id) {
    state.currentElementId = id;
  },

  /**
   * Set application's dicts with basic data.
   *
   * @param {Object} state state
   * @param {Object} dicts discts
   */
  setDicts(state, dicts) {
    state.dicts = dicts;
    return state.dicts;
  }
};
