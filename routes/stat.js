var express = require("express");
const { exec } = require("child_process");
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('stat')
})

module.exports = router;
