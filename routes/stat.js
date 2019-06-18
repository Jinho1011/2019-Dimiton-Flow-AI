const express = require('express')
const fs = require('fs')
const router = express.Router()
var admin = require('firebase-admin')
var serviceAccount = require('./automatic-dam-firebase-adminsdk-boz33-fe04b539aa.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://automatic-dam.firebaseio.com'
})

var database = admin.database()
var ref = database.ref('queue/')

let WATER_LEVEL
let TURBIDITY
let isChangable = true
let isDischargingNow = false

var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var csvData

fs.readFile('./tensorflow/easy.csv', {
  encoding: 'utf-8'
}, function (
  err,
  data
) {
  if (err) {
    console.log('TCL: err', err)
  }
  csvData = data.split('\n')
})

var waterDischarge = []
var waterLevel = []
var waterDischargeCnt = 0
var waterLevelCnt = 0

var timeLeft
var timeRef = database.ref('time')

io.on('connection', socket => {
  io.emit('water-level-2', WATER_LEVEL)
})

setInterval(() => {
  timeRef.once('value').then((s) => {
    timeLeft = s.val()
  })
  io.emit('discharge-status-timer-2', timeLeft)
}, 1000)

setInterval(() => {
  io.emit('water-level-2', WATER_LEVEL)
  io.emit('discharge-status-2', isDischargingNow)
  io.emit('water-quality-2', TURBIDITY)
}, 500)

setInterval(() => {
  for (var i in csvData) {
    waterDischarge[i] = csvData[i].split(',')[0]
    waterLevel[i] = csvData[i].split(',')[4]
  }
  io.emit('water-discharge-1', waterDischarge[waterDischargeCnt])
  io.emit(
    'water-discharge-2',
    Math.abs(
      waterDischarge[waterDischargeCnt] *
      (Math.cos(
        waterDischarge[waterDischargeCnt] ^
          (2 + 4 * Math.cos(waterDischarge[waterDischargeCnt] + 100))
      ) /
        9)
    )
  )
  io.emit('water-level-1', waterLevel[waterLevelCnt])
  waterDischargeCnt++
  waterLevelCnt++
}, 5000)

server.listen(8080, function () {
  console.log('Socket IO server listening on port 8080')
})

// UDP CODE
const dgram = require('dgram')
const UDPsocket = dgram.createSocket('udp4')
UDPsocket.bind(3000)

UDPsocket.on('listening', function () {
  console.log('listening event')
})

UDPsocket.on('message', function (msg, rinfo) {
  const UDP_RES = msg.toString()

  WATER_LEVEL = UDP_RES.split(',')[0]
  TURBIDITY = UDP_RES.split(',')[1]

  if (WATER_LEVEL > 8) {
    if (isChangable) {
      ref.push().set('on1')
      isChangable = false
      isDischargingNow = true
    }
  } else {
    if (!isChangable) {
      ref.push().set('off1')
      isChangable = true
      isDischargingNow = false
    }
  }
})

router.get('/', function (req, res, next) {
  res.render('stat')
})

router.get('/on1', function (req, res, next) {
  ref.push().set('on1')
  res.redirect('/stat')
})

router.get('/on2', function (req, res, next) {
  ref.push().set('on2')
  res.redirect('/stat')
})

router.get('/off2', function (req, res, next) {
  ref.push().set('off2')
  res.redirect('/stat')
})

router.get('/off1', function (req, res, next) {
  ref.push().set('off1')
  res.redirect('/stat')
})

router.get('/onall', function (req, res, next) {
  ref.push().set('onall')
  res.redirect('/stat')
})

router.get('/offall', function (req, res, next) {
  ref.push().set('offall')
  res.redirect('/stat')
})

module.exports = router
