import { API_ROOT } from '../config';

export default {
  root: async () => {
    try {
      let res = await fetch(`${API_ROOT}/`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  dicts: async () => {
    try {
      let res = await fetch(`${API_ROOT}/dicts`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  context: async (id, nameSpace='public') => {
    try {
      let res = await fetch(`${API_ROOT}/${nameSpace}/contexts/${id}`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  elements: async (ids, nameSpace='public') => {
    if (!ids instanceof Array) throw new Error('Ids must be an array');
    try {
      let res = await fetch(`${API_ROOT}/${nameSpace}/elements?ids=${ids.join(',')}`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  element: async (id, nameSpace='public') => {
    try {
      let res = await fetch(`${API_ROOT}/${nameSpace}/elements/${id}`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  shapes: async (ids, nameSpace='public') => {
    if (!ids instanceof Array) throw new Error('Ids must be an array');
    try {
      let res = await fetch(`${API_ROOT}/${nameSpace}/shapes?ids=${ids.join(',')}`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  shape: async (id, nameSpace='public') => {
    try {
      let res = await fetch(`${API_ROOT}/${nameSpace}/shapes/${id}`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  scenario: async (name, nameSpace='public') => {
    try {
      let res = await fetch(`${API_ROOT}/${nameSpace}/scenarios/${name}`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }
};
