import Marionette from "backbone.marionette";
import Mapbox from "mapbox-gl";
import {MAPBOX_ACCESS_TOKEN, MAP_SOURCE} from "../config";

const MapView = Marionette.ItemView.extend({
  template: false,
  onShow() {
    Mapbox.accessToken = MAPBOX_ACCESS_TOKEN;
    var map = new Mapbox.Map({
        container: "map",
        style: MAP_SOURCE,
        center: [ 8.3221, 46.5928 ],
        maxZoom: 6,
        minZoom: 1.76,
        zoom: 3,
        hash: true,
        attributionControl: true
    });
    map.addControl(new Mapbox.Navigation());
  }
});


export default MapView;
