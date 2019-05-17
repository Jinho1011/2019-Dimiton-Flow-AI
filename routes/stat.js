var express = require("express");
const { exec } = require("child_process");
var fs = require('fs');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('stat')
})

router.post("/data", function(req, res, next) {
  var {cmd} = req.body;
	console.log("TCL: cmd", cmd)
  return res.redirect("/");
});

module.exports = router;
