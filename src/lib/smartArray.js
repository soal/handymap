import uniqWith from "lodash/uniqWith";
import capitalize from "lodash/capitalize";

/**
 * Array that keeps only unique elements and compare objects by id if present.
 *
 * @class SmartArray
 * @extends {Array}
 */

const createVirtualPaths = Symbol("createVirtualPaths");
const isObject = Symbol("isObject");
const check = Symbol("check");

class SmartArray extends Array {
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
          configurable: false
        });
      }
    };
    this[isObject] = object => {
      var toClass = {}.toString;
      return toClass.call(object) === "[object Object]";
    };
    this[check] = object => {
      if (this[isObject](object) && this.find(item => object.id === item.id)) {
        return false;
      }
      return false;
    };

    for (let el of this.entries()) {
      if (this[isObject](el[1])) {
        this[createVirtualPaths](el[1]);
      }
    }


    this.push = (item, ...rest) => {
      if (this[check](item)) {
        return false;
      } else {
        if (this[isObject](item)) {
          this[createVirtualPaths](item);
        }
        return super.push(item, ...rest);
      }
    };
    this.unshift = (item, ...rest) => {
      if (this[check](item)) {
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
    this.includes = (item, index) => {
      if (this.slice(index)[check](item)) {
        return true;
      } else {
        return super.includes(item, index);
      }
    };
    this.getById = (id) => {
      var finded = this.find(el => id === el.id);
      for (let virtualPath of this.virtualPaths) {
        finded[virtualPath] = finded[`get${capitalize(virtualPath)}`]();
      }
      return finded;
    };

    this.delete = (item) => {
      this.splice(this.findIndex(el => {
        if (item.id && el.id) {
          return item.id === el.id;
        } else {
          return item === el;
        }
      }), 1);
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
