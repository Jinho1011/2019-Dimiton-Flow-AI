var express = require('express')
const { exec } = require("child_process")
var router = express.Router()

router.post('/', function (req, res, next) {
    var rawData = req.body  
	console.log("TCL: rawData", rawData)
    return res.redirect('/')
})

module.exports = router
