/**
 * Created by dario on 23/01/2018.
 */
var express = require('express');
var router = express.Router();

var CustomersModel = require('./../models/customer/customerSchema');

router.get('/', function(req, res, next) {
    // CustomersModel.find({});
})

router.get('/setupcustomer', function(req, res, next) {
    var customer =  new CustomersModel;
    customer.title = "Sig";
    customer.name = "marco";
    customer.surname = "Rossi";
    customer.piva = "piva049295039386";
    customer.cf = "cf049295039386";
    customer.skype = "cf049295039386";
    customer.birthDay = new Date();
    customer.note = "really buliccio";

    customer.address = [{
        type:"work",
        state:"Italia",
        address:"via pippo pluto",
        city :"Genova",
        postcode:"17100",
        province:"GE"
    },{
        type:"work",
        state:"Italia",
        address:"via pippo pluto",
        city :"Genova",
        postcode:"17100",
        province:"GE"
    }];

    customer.phone = [{
        type:"work",
        phone:"39585738394"
    },{
        type:"home",
        phone:"39585738394"
    }]

    customer.email = [{
        type:"work",
        email:"mail1@mail.pp"
    },{
        type:"home",
        email:"mail2@mail.pp"
    }]

    customer.meta = [{
        type:"website",
        value:"website.pp"
    },{
        type:"meta2",
        value:"meta2"
    }]

    // customer.created_at
})

module.exports = router;