var express = require('express')
var router = express.Router()
var admin = require('firebase-admin')

var database = admin.database()
var ref = database.ref('time')
var cmdRef = database.ref('queue/')

var stat = true

var timeLeft = 872
ref.set(timeLeft)
// 얘는 한번만 실행됨

setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--
    ref.set(timeLeft)
  } else {
    if (stat) {
      cmdRef.push().set('on1')
      timeLeft = 10
      stat = false
    } else {
      cmdRef.push().set('off1')
      timeLeft = 2861
      stat = true
    }
  }
}, 1000)

router.get('/', function (req, res, next) {
  res.render('command')
})

router.post('/', function (req, res, next) {
  switch (req.body.cmd) {
    case 'reset to 14:32 (872)':
      timeLeft = 872
      ref.set(timeLeft)
      break
    case 'decrease 11 min 12 sec':
      timeLeft = timeLeft - 611
      ref.set(timeLeft)
      break
    case 'decrease 1 min':
      timeLeft = timeLeft - 60
      ref.set(timeLeft)
      break
    case 'decrease 30 sec':
      timeLeft = timeLeft - 30
      ref.set(timeLeft)
      break
    case 'increase 1 min':
      timeLeft = timeLeft + 60
      ref.set(timeLeft)
      break
    case 'increase 30 sec':
      timeLeft = timeLeft + 30
      ref.set(timeLeft)
      break
    case 'on1':
      cmdRef.push().set('on1')
      break
    case 'on2':
      cmdRef.push().set('on2')
      break
    case 'off1':
      cmdRef.push().set('off1')
      break
    case 'off2':
      cmdRef.push().set('off2')
      break
    case 'onall':
      cmdRef.push().set('onall')
      break
    case 'offall':
      cmdRef.push().set('offall')
      break
  }
  res.redirect('/cmd')
})

module.exports = router
