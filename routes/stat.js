const express = require('express')
const fs = require('fs')
const router = express.Router()
let WATER_LEVEL
let TURBIDITY

const dgram = require('dgram')
const socket = dgram.createSocket('udp4')
socket.bind(3000)

socket.on('listening', function () {
  console.log('listening event')
})

socket.on('message', function (msg, rinfo) {
  const UDP_RES = msg.toString()
  console.log('TCL: UDP_RES', UDP_RES)
  WATER_LEVEL = UDP_RES.split(',')[0]
  TURBIDITY = UDP_RES.split(',')[1]
  // fs.appendFile("./tensorflow/data-set.csv", WATER_LEVEL + "\n", function(err) {
  //   if (err) throw err;
  // });
})

router.get('/', function (req, res, next) {
  res.render('stat')
  console.log('TCL: WATER_LEVEL', WATER_LEVEL)
  console.log('TCL: TURBIDITY', TURBIDITY)
})

module.exports = router
