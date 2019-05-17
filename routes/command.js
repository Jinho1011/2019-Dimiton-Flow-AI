var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("./automatic-dam-firebase-adminsdk-boz33-fe04b539aa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://automatic-dam.firebaseio.com"
});

var database = admin.database();
var ref = database.ref("queue/");

router.get("/", function(req, res, next) {
  res.render("command");
});

router.post("/", function(req, res, next) {
	console.log("TCL: req", req.body)
  var cmd = req.body.cmd;
  res.redirect("/cmd");
  ref.push().set(cmd);
});

module.exports = router;
