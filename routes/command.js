var express = require("express");
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('command')
})

router.post('/', function(req, res, next) {
    
})

module.exports = router;
