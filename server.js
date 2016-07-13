var http = require("http");
var express = require("express");
var fallback = require("express-history-api-fallback");

const app = express();

const root = `${__dirname}/static`;
app.use(express.static(root));

var options = {
  root: __dirname,
  headers: {
    "x-timestamp": Date.now(),
    "x-sent": true,
    "x-encoding": "utf-8"
  }
};
app.get("api/elements/100", function (req, res) {
  res.sendFile("test_data/jsons/second_punic_war.json", options);
});
app.get("api/elements/100/text", function (req, res) {
  res.sendFile("test_data/jsons/second_punic_war_text.json", options);
});

app.get("api/elements/1", function (req, res) {
  res.sendFile("test_data/jsons/roman_republic.json", options);
});
app.get("api/elements/1/text", function (req, res) {
  res.sendFile("test_data/jsons/roman_republic_text.json", options);
});

app.get("api/elements/7", function (req, res) {
  res.sendFile("test_data/jsons/carthago.json", options);
});
app.get("api/elements/7/text", function (req, res) {
  res.sendFile("test_data/jsons/carthago_text.json", options);
});

app.get("api/elements/9001", function (req, res) {
  res.sendFile("test_data/jsons/battle_of_cannae.json", options);
});
app.get("api/elements/9001/text", function (req, res) {
  res.sendFile("test_data/jsons/battle_of_cannae_text.json", options);
});

app.get("api/shapes/101", function (req, res) {
  res.sendFile("test_data/shapes/battle_of_cannae.geojson", options);
});
app.get("api/shapes/71", function (req, res) {
  res.sendFile("test_data/shapes/carthago.geojson", options);
});
app.get("api/shapes/11", function (req, res) {
  res.sendFile("test_data/shapes/roman_republic.geojson", options);
});

app.get("api/elements/9001/shapes", function (req, res) {
  res.sendFile("test_data/shapes/battle_of_cannae.geojson", options);
});
app.get("api/elements/7/shapes", function (req, res) {
  res.sendFile("test_data/shapes/carthago.geojson", options);
});
app.get("api/elements/1/shapes", function (req, res) {
  res.sendFile("test_data/shapes/roman_republic.geojson", options);
});
app.get("api/elements", function (req, res) {
  res.sendStatus(404);
});

app.use(fallback("index.html", { root }));

http.createServer(app).listen(8080);
