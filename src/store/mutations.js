import { union, unionBy, isArray } from 'lodash'
import {
  SCENARIO_SET,
  SCENARIO_ROOT_SET,
  ELEMENTS_SET,
  ELEMENTS_SELECT,
  ELEMENTS_SET_CURRENT,
  ELEMENTS_CLEAR,
  REFERENCES_SET,
  SHAPES_ADD_SINGLE,
  SHAPES_ADD,
  SHAPES_CLEAR,
  UI_INFOBOX_SET
} from '@/store/mutationTypes'

export default {
  [SCENARIO_SET](state, scenario) {
    state.scenario = scenario
  },

  [ELEMENTS_SET](state, elements) {
    state.elements = unionBy(state.elements, isArray(elements) ? elements : [elements], 'id')
  },
  [ELEMENTS_SELECT](state, id) {
    state.selectedElementsIds = union(state.selectedElementsIds, [id], 'id')
  },
  [ELEMENTS_SET_CURRENT](state, id) {
    state.currentElementId = id
  },
  [ELEMENTS_CLEAR](state) {
    state.elements = []
  },

  [SCENARIO_ROOT_SET](state, rootScenario) {
    state.rootScenario = rootScenario
    let scenario = Object.assign({}, rootScenario, { dirty: false, contexts: [rootScenario.context] })
    delete scenario.context
    state.scenario = scenario
  },

  [REFERENCES_SET](state, references) {
    state.references = references
  },

  [SHAPES_ADD_SINGLE](state, shape) {
    state.shapes.push(shape)
  },
  [SHAPES_ADD](state, shapes) {
    state.shapes = unionBy(state.shapes, shapes, 'properties.id')
  },
  [SHAPES_CLEAR](state) {
    state.shapes = []
  },
  [UI_INFOBOX_SET](state, showing) {
    state.infoBoxShowed = showing
  }
}
