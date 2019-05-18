var express = require("express");
const { exec } = require("child_process");
var fs = require("fs");
var router = express.Router();

var lev, turb;

// on1 -> 물이 들어옴
// on2 -> 물을 방류함

// 현재 수위 -> 막대 그래프
// 탁도 -> 5분 간의 변화를 보여주도록 하는 시계열 그래프
// 예상 -> ""

router.get("/", function(req, res, next) {
  res.render("stat");
});

router.post("/data", function(req, res, next) {
  var cmd = req.body.data;
  var temp = cmd.split(",");
  lev = temp[0];
  console.log("TCL: lev", lev);
  turb = temp[1];
  console.log("TCL: turb", turb);
  var rawData = cmd + "\n";
  // console.log("TCL: rawData", rawData)
  fs.appendFile("temp.csv", rawData, function(err) {
    if (err) throw err;
  });
  return res.redirect("/");
});

module.exports = {
  router: router
};
