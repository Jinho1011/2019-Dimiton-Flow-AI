var express = require('express')
var router = express.Router()

var rawData

router.post('/', function (req, res, next) {
    rawData = req.body
    return res.redirect('/')
})

module.exports = router
