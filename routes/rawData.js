var express = require('express')
var router = express.Router()

/* GET home page. */
router.post('/', function (req, res, next) {
    console.log("TCL: req", req.body)
    return res.redirect('/')
})

module.exports = router
