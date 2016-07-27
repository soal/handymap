import uniqWith from "lodash/uniqWith";

/**
 * Array that keeps only unique elements and compare objects by id if present.
 *
 * @class SmartArray
 * @extends {Array}
 */

class SmartArray extends Array {
  constructor(items, virtualPaths=null) {
    super(...items);
    this.createVirtualPaths = Symbol("createVirtualPaths");
    this.isObject = Symbol("isObject");
    this.check = Symbol("check");


    Object.defineProperty(this, "virtualPaths", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: virtualPaths
    });
    // this.virtualPaths = virtualPaths;

    this[this.createVirtualPaths] = item => {
      for (let virtualPath of this.virtualPaths) {
        Object.defineProperty(item, virtualPath, {
          get: () => this.filter(el => item[`${virtualPath}_ids`].includes(el.id)),
          set: data => {
            item[`${virtualPath}_ids`] = data.map(el => el.id);
          }
        });
      }
    };
    this[this.isObject] = object => {
      var toClass = {}.toString;
      return toClass.call(object) === "[object Object]";
    };
    this[this.check] = object => {
      if (this[this.isObject](object) && this.find(item => object.id === item.id)) {
        return true;
      }
      return false;
    };
    for (let el of this.entries()) {
      if (this[this.isObject](el[1])) {
        this[this.createVirtualPaths](el[1]);
      }
    }
  }

  unshift(item, ...rest) {
    if (this[this.check](item)) {
      return false;
    } else {
      if (this[this.isObject](item)) {
        this[this.createVirtualPaths](item);
      }
      return super.unshift(item, ...rest);
    }
  }
  push(item, ...rest) {
    if (this[this.check](item)) {
      return false;
    } else {
      if (this[this.isObject](item)) {
        this[this.createVirtualPaths](item);
      }
      return super.push(item, ...rest);
    }
  }
  concat(...args) {
    var newArray = super.concat(...args);
    return uniqWith(newArray.reverse(), (first, second) => {
      if (first.id && second.id) {
        if (this[this.isObject](first)) {
          this[this.createVirtualPaths](first);
        }
        return first.id === second.id;
      } else {
        return first === second;
      }
    });
  }
  includes(item, index) {
    if (this.slice(index)[this.check](item)) {
      return true;
    } else {
      return super.includes(item, index);
    }
  }
  getById(id) {
    return this.find(el => id === el.id);
  }

  delete(item) {
    this.splice(this.findIndex(el => {
      if (item.id && el.id) {
        return item.id === el.id;
      } else {
        return item === el;
      }
    }), 1);
  }
  deleteById(id) {
    return this.splice(this.findIndex(el => el.id === id), 1);
  }
  sortBy(field) {
    return this.sort((a, b) => {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
  }
  clear() {
    this.length = 0;
  }
}
export default SmartArray;
module.export = SmartArray;
