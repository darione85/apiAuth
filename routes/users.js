var express = require('express');
var router = express.Router();

var UserModel = require('./../models/authApi/userSchema');

var jwt = require('jsonwebtoken');

var config = require('../config/config.js');



/* GET users listing. */
router.get('/', function(req, res, next) {
    UserModel.find({},function (err, users) {
        res.json(users);
    })

});

router.get('/login', function(req, res, next) {

    // res.json({message:"user login"});
    // res.json(viewsPath+"/login.html")
    //  res.sendFile(req.app.get('views')+"/login_html.html")
   res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    req.body.email;
    req.body.password;
    console.log(res);
    res.render('login', { title: 'Express' });
});

router.get('/adduser/admin', function(req, res, next) {
    // req.params.username;
    // req.params.password;

    var User = new UserModel({
        name: 'admin',
        username: 'admin',
        password: 'admin4cima',
        email:'dario.rubado@gmail.com',
        token : 'xxxx',
        admin: true,
        location: 'ceriale',
        meta: {
            age: 31,
            website: "www.karuweb.it"
        },
        created_at: new Date(),
        updated_at: new Date()

    });

    User.save().then(function (err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    })
    // User.save().then(() => console.log('meow'));

});

router.get('/logout', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/authenticate/:username/:password', function(req, res, next) {
    var username = req.query.username || req.body.username || req.params.username
    var password = req.query.password || req.body.password || req.params.password

    // find the user
    UserModel.findOne({
        username: username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user._doc, config.secret,{expiresIn: '500m'});

                user.token = token

                user.save(function(err) {
                    if (err)
                        console.log('error')
                    else
                        console.log('success')
                });
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    // user:user,
                    token: token
                });
            }

        }

    });
});




module.exports = router;
