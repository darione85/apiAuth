var express = require('express');
var router = express.Router();

var UserModel = require('./../models/authApi/userSchema')



/* GET users listing. */
router.get('/', function(req, res, next) {
    winston.log({
        lever:"info",
        message:"INIT ROUTES"
    });
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {

    // res.json({message:"user login"});
    // res.json(viewsPath+"/login.html")
    // res.sendFile(req.app.get('views')+"/login.html")
    res.render('login', { title: 'Express' });
});

router.get('/logout', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/status', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
