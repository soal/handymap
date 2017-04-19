import { API_ROOT } from '../config';

export default {
  root: () => {
    return fetch(`${API_ROOT}/`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  dicts: () => {
    return fetch(`${API_ROOT}/dicts`)
      .then(res => {
        return res.json().then(json => {
          return json;
        });
      })
      .catch(err => {
        console.log(err);
      })
  },

  context: (id, nameSpace='public') => {
    return fetch(`${API_ROOT}/${nameSpace}/contexts/${id}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  elements: (ids, nameSpace='public') => {
    if (!ids instanceof Array) throw new Error('Ids must be an array');
    return fetch(`${API_ROOT}/${nameSpace}/elements?ids=${ids.join(',')}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  element: (id, nameSpace='public') => {
    return fetch(`${API_ROOT}/${nameSpace}/elements/${id}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  shapes: (ids, nameSpace='public') => {
    if (!ids instanceof Array) throw new Error('Ids must be an array');
    return fetch(`${API_ROOT}/${nameSpace}/shapes?ids=${ids.join(',')}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  shape: (id, nameSpace='public') => {
    return fetch(`${API_ROOT}/${nameSpace}/shapes/${id}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  scenario: (name, nameSpace='public') => {
    return fetch(`${API_ROOT}/${nameSpace}/scenarios/${name}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  }
}
