// import axios from 'axios';
import { API_ROOT } from '../config';

// const httpConfig = {
//   timeout: 10000
// };

// const xhrq = {
//   root: axios.create({
//     baseURL: `${API_ROOT}/`,
//     timeout: httpConfig.timeout
//   }),

//   dicts: axios.create({
//     baseURL: `${API_ROOT}/dicts`,
//     timeout: httpConfig.timeout
//   }),

//   contexts: axios.create({
//     baseURL: `${API_ROOT}/contexts`,
//     timeout: httpConfig.timeout
//   }),

//   elements: axios.create({
//     baseURL: `${API_ROOT}/elements`,
//     timeout: httpConfig.timeout
//   }),

//   shapes: axios.create({
//     baseURL: `${API_ROOT}/shapes`,
//     timeout: httpConfig.timeout
//   }),

//   scenarios: axios.create({
//     baseURL: `${API_ROOT}/scenarios`,
//     timeout: httpConfig.timeout
//   })
// };

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

  context: id => {
    return fetch(`${API_ROOT}/contexts/${id}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  elements: ids => {
    if (!ids instanceof Array) throw new Error('Ids must be an array');
    return fetch(`${API_ROOT}/elements?ids=${ids.join(',')}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  element: id => {
    return fetch(`
    ${API_ROOT}/elements/${id}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  shapes: ids => {
    if (!ids instanceof Array) throw new Error('Ids must be an array');
    return fetch(`${API_ROOT}/shapes?ids=${ids.join(',')}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  shape: id => {
    return fetch(`${API_ROOT}/shapes/${id}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  },

  scenario: id => {
    return fetch(`${API_ROOT}/scenarios/${id}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err);
      })
  }
}
