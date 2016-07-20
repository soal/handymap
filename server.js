var http = require("http");
var express = require("express");
var fallback = require("express-history-api-fallback");

const app = express();

const root = `${__dirname}`;

app.use(express.static(root));

app.use(fallback("index.html", { root }));

http.createServer(app).listen(8080);
