/* eslint-disable no-unused-vars */

export const DEBUG = process.env.NODE_ENV !== 'production';
export const API_VERSION = 'v1';

let fakeAPI;
// fakeAPI = 'https://hf-fake-api.herokuapp.com/api';
//  fakeAPI = "http://192.168.0.35:9000/api";
// fakeAPI = "http://192.168.0.42:9000/api";
fakeAPI = 'http://localhost:9000/api';

// export const API_ROOT = (process.env.NODE_ENV === "production")
//       ? "https://handymap.com/api"
//       : fakeAPI;

export const API_ROOT = fakeAPI;

export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic29hbCIsImEiOiJjaW1qZndnMmwwMDEzdzBtNHRxcGFrampqIn0.bpwowsJ4GLBdsPnnXuZboA';

const mapboxSource = 'mapbox://styles/soal/cj0v9r49j00lq2rtact0w0ldv'; // blank map source
// const mapboxSource = "mapbox://styles/soal/cj0uqef7100ln2rnyctasfinu"; // terrain source
// const localSource = require("../mapstyle-blank.json");
const localSource = require('../mapstyle.json');
/**
 * What maps source you want to use? mapbox or local
 * @type {String}
 */
export const MAP_SOURCE = mapboxSource;
// export const MAP_SOURCE = localSource;

// module.exports = API_ROOT;
