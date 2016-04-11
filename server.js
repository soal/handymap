var http = require("http");
var express = require("express");
var path = require("path");

var app = express();

var router = express.Router();

router.get("/", function(req, res) {
  res.send("static/index.html");
});

app.use(express.static(path.join(__dirname, "static")));


app.use(function(err, req, res, next) {
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
});

app.use("/", router);

http.createServer(app).listen(8080);