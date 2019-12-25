var mongoose = require("mongoose");
var config = require('./mongo');

mongoose.connect(config.url);

let connection = mongoose.connection;

connection.on("connected", function () {
  console.log('Mongoose connection success to' + config.url);
});

connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});

connection.on("disconnected", function () {
  console.log('Mongoose connection disconnected.');
});

module.exports = mongoose;
