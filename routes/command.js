var express = require('express')
var router = express.Router()
var admin = require('firebase-admin')

var database = admin.database()
var ref = database.ref('time')

var timeLeft = 872
ref.set(timeLeft)

setInterval(() => {
  if (timeLeft) {
    timeLeft--
    ref.set(timeLeft)
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
  }
  res.redirect('/cmd')
})

module.exports = router
