export default {

  /**
   * Returns single element finded by given selector and value.
   *
   * @param  {any} value            value of the selector to search with.
   * @param  {string} selector="id" property to search by.
   *
   * @return {Object} Single element
   */
  queryElement: state => {
    return (value, selector="id") => state.elements.find(element => element[selector] === value);
  },
  /**
   * Returns array of elements filtered by given selector and value.
   *
   * @param  {any} value            value of the selector to search with.
   * @param  {string} selector="id" property to search by.
   *
   * @return {Object[]} Array of scenarios
   */
  queryElements: state => {
    return (value, selector="id") => state.elements.filter(element => element[selector] === value);
  },

  isElementSelected: state => id => id in state.selectedElements.map(el => el.id),

  selectedElements: state => state.elements.filter(el => el.id in state.selectedElementsIds),

  currentElement: (state, getters) => getters.queryElement(state.currentElementId),

  contextElements: state => {
    return state.elements.filter(element => {
      // TODO: add filtering by links types
      return element.type in state.activeContext.elementsTypes ||
             element.id in state.activeContext.additionalElementsIds ||
             element.weigth >= state.activeContext.weight;
    });
  }
};
