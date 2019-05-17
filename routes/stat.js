var express = require("express");
const { exec } = require("child_process");
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('stat')
})

router.post("/data", function(req, res, next) {
  var {cmd} = req.body;
	console.log("TCL: cmd", cmd)
  return res.redirect("/");
});

// 1분 동안 들어온 데이터 String으로 저장
// 1분 간격으로 py에 데이터 전달 (setInterval)

module.exports = router;
