var express = require("express");
var fs = require("fs");
var router = express.Router();
var TURBIDITY; // 탁도
var WATER_LEVEL; // 수위

// UDP SOCKET SERVER
var dgram = require("dgram");
var socket = dgram.createSocket("udp4");
socket.bind(3000);

socket.on("listening", function() {
  console.log("listening event");
});

socket.on("message", function(msg, rinfo) {
  console.log(rinfo.address, msg.toString());
  var UDP_RES = msg.toString
  // TURBIDITY, WATER_LEVEL initializing
  // append data to temp.csv
});

socket.on("close", function() {
  console.log("close event");
});

// router.post("/data", function(req, res, next) {
//   var cmd = req.body.data;
//   // console.log("TCL: cmd", cmd);
//   var temp = cmd.split(",");
//   lev = temp[0];
//   // console.log("TCL: lev", lev);
//   turb = temp[1];
//   // console.log("TCL: turb", turb);s
//   var rawData = cmd + "\n";
//   fs.appendFile("temp.csv", rawData, function(err) {
//     if (err) throw err;
//   });
//   return res.redirect("/");
// });


// ROUTER
router.get("/", function(req, res, next) {
  res.render("stat", {
    turb: TURBIDITY
  });
});

module.exports = {
  router: router
};
