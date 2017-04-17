import axios from 'axios';
import { API_ROOT } from '../config';

const httpConfig = {
  timeout: 10000
};

export default {
  root: axios.create({
    baseURL: `${API_ROOT}/`,
    timeout: httpConfig.timeout
  }),

  elements: axios.create({
    baseURL: `${API_ROOT}/elements`,
    timeout: httpConfig.timeout
  }),

  shapes: axios.create({
    baseURL: `${API_ROOT}/shapes/`,
    timeout: httpConfig.timeout
  }),

  scenarios: axios.create({
    baseURL: `${API_ROOT}/scenarios/`,
    timeout: httpConfig.timeout
  })
};

