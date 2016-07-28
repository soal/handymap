import uniqWith from "lodash/uniqWith";
import capitalize from "lodash/capitalize";


const createVirtualPaths = Symbol("createVirtualPaths");
const isObject = Symbol("isObject");
const existed = Symbol("existed");

/**
 * Array that keeps only unique elements and compare objects by id if present.
 *
 * @class SmartArray
 * @extends {Array}
 */
class SmartArray extends Array {
  /**
   * Creates an instance of SmartArray.
   *
   * @param {any[]}    items                Items to keep in SmartArray
   * @param {string[]} [virtualPaths=null]  Names of virtual elements of objects in array, constructor generates get functions for them (e.g. "getChildren()" for "children")
   */
  constructor(items, virtualPaths=null) {
    super(...items);

    Object.defineProperty(this, "virtualPaths", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: virtualPaths
    });

    this[createVirtualPaths] = item => {
      for (let virtualPath of this.virtualPaths) {
        Object.defineProperty(item, `get${capitalize(virtualPath)}`, {
          value: () => {
            return this.filter(el => item[`${virtualPath}_ids`].includes(el.id));
          },
          enumerable: false,
          configurable: true
        });
      }
    };
    this[isObject] = object => {
      var toClass = {}.toString;
      return toClass.call(object) === "[object Object]";
    };
    this[existed] = object => {
      return this[isObject](object) && this.find(item => object.id === item.id);
    };

    for (let el of this.entries()) {
      if (this[isObject](el[1])) {
        this[createVirtualPaths](el[1]);
      }
    }

    this.push = (item, ...rest) => {
      if (this[existed](item)) {
        return false;
      } else {
        if (this[isObject](item)) {
          this[createVirtualPaths](item);
        }
        return super.push(item, ...rest);
      }
    };

    this.unshift = (item, ...rest) => {
      if (this[existed](item)) {
        return false;
      } else {
        if (this[isObject](item)) {
          this[createVirtualPaths](item);
        }
        return super.unshift(item, ...rest);
      }
    };

    this.concat = (...args) => {
      var newArray = super.concat(...args);
      return uniqWith(newArray.reverse(), (first, second) => {
        if (first.id && second.id) {
          if (this[isObject](first)) {
            this[createVirtualPaths](first);
          }
          return first.id === second.id;
        } else {
          return first === second;
        }
      });
    };

    this.slice = (...args) => {
      return new SmartArray(super.slice(...args), [...this.virtualPaths]);
    };

    this.includes = (item, index=0) => {
      if (this.slice(index)[existed](item)) {
        return true;
      } else {
        return super.includes(item, index);
      }
    };

    this.includesId = (id, index=0) => {
      return this.includes({ id: id }, index);
    };

    this.getById = (id) => {
      var finded = this.find(el => id === el.id);
      if (finded) {
        var tmp = {};
        for (let virtualPath of this.virtualPaths) {
          tmp[virtualPath] = finded[`get${capitalize(virtualPath)}`]();
        }
        return Object.assign(finded, tmp);
      }
    };

    this.deleteById = (id) => {
      return this.splice(this.findIndex(el => el.id === id), 1);
    };

    this.sortBy = (field) => {
      return this.sort((a, b) => {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        return 0;
      });
    };
    this.clear = () => { this.length = 0; };
  }
}
export default SmartArray;
module.export = SmartArray;
