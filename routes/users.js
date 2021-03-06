var express = require('express');
var router = express.Router();

var UserModel = require('./../models/authApi/userSchema');

var jwt = require('jsonwebtoken');

var config = require('../config/config.js');


// router.use(function (req, res, next) {
//     console.log('Time:', Date.now());
//     next();
// });


/* GET users listing. */
// router.get('/', function(req, res, next) {
//     UserModel.find({},function (err, users) {
//         res.json(users);
//     })
//
// });

router.get('/login', function(req, res, next) {

    // res.json({message:"user login"});
    // res.json(viewsPath+"/login.html")
    //  res.sendFile(req.app.get('views')+"/login_html.html")
   res.render('login/loginb4', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    var username = req.query.username || req.body.username || req.params.username
    var email = req.query.email || req.body.email || req.params.email
    var password = req.query.password || req.body.password || req.params.password

    // find the user
    UserModel.findOne({
        // username: username
        email: email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user._doc.password != password) {
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

                res.render('dashboard', { success:true,token: token });
                // res.json({
                //     success: true,
                //     message: 'Enjoy your token!',
                //     // user:user,
                //     token: token
                // });
            }

        }

    });
});

// router.get('/adduser/admin', function(req, res, next) {
//     // req.params.username;
//     // req.params.password;
//
//     var User = new UserModel({
//         name: 'admin',
//         username: 'admin',
//         password: 'admin4cima',
//         email:'dario.rubado@gmail.com',
//         token : 'xxxx',
//         admin: true,
//         location: 'ceriale',
//         meta: {
//             age: 31,
//             website: "www.karuweb.it"
//         },
//         created_at: new Date(),
//         updated_at: new Date()
//
//     });
//
//     User.save().then(function (err) {
//         if (err) throw err;
//         console.log('User saved successfully');
//         res.json({ success: true });
//     })
//     // User.save().then(() => console.log('meow'));
//
// });

router.get('/logout', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/dashboard/:username', function(req, res, next) {
    var username = req.params.username
    // find the user
    UserModel.findOne({
        username: username
        // email: email
    }, function(err, user) {

        if(user){
            if (user.hasOwnProperty('_doc')&& typeof user._doc ==="object"){
                if (user._doc.admin){
                    UserModel.find({},function (err,users) {
                        res.render('dashboard/dashboardv2', {user:user._doc, users:users})
                    })
                }else{
                    res.render('dashboard/dashboardv2', {user:user._doc})
                }

            }else{
                res.render('error',{message:"No user found Error", error:{status:"200",stack:"error"}})
            }
        }else{
            res.render('dashboard/error',{message:"No user found Error", error:{status:"200",stack:"error"}})
        }

        /// / res.sendfile('views/dashboardhtml.html', { success:true,token: "pippo", user:user });
        // res.render('dashboard/dashboardv2')
        // res.render('dashboard/dashboardFull')
    })


});

router.get('/authenticate', function(req, res, next) {
    var username = req.query.username || req.body.username || req.params.username
    var email = req.query.email || req.body.email || req.params.email
    var password = req.query.password || req.body.password || req.params.password

    // find the user
    UserModel.findOne({
        // username: username
        email: email
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
                var token = jwt.sign({username:user._doc.username}, config.secret,{expiresIn: '500m'});

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
