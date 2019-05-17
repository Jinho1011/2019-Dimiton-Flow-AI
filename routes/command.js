var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("./automatic-dam-firebase-adminsdk-boz33-fe04b539aa.json");

router.get('/', function (req, res, next) {
  res.render('command')
})

router.post('/', function(req, res, next) {
    console.log("TCL: req", req.body)
    res.redirect('/cmd')
})

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://automatic-dam.firebaseio.com"
  });

  // var database = admin.database();
  // var ref = database.ref("queue/");
  // ref.push().set('on1')

  // addInQueue.use(cors());
  // addInQueue.get("/:command", (req, res) => {
  //   var ret = {};
  //   var command = req.params.command;
  //   ret["command"] = command;
  //   firebase
  //     .ref("/queue")
  //     .push()
  //     .set(command);

  //   res.status(200).send(JSON.stringify(ret));
  // });

  // admin.ref("queue/").set({ test: "test"});

module.exports = router;
