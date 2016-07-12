const API_VERSION = "0.1";

export const API_ROOT = (process.env.NODE_ENV === "production")
      ? "https://handymap.com/api"
      : `http://localhost:5000/api/v${API_VERSION}`;

export const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic29hbCIsImEiOiJjaW1qZndnMmwwMDEzdzBtNHRxcGFrampqIn0.bpwowsJ4GLBdsPnnXuZboA";

const mapboxSource = "mapbox://styles/soal/cimlxnm0d006yzpmccqs5dg01";
const localSource = "mapstyle.json";
/**
 * What maps source you want to use? mapbox
 * @type {String}
 */
export const MAP_SOURCE = mapboxSource;
// export const MAP_SOURCE = localSource;
