/**
 * Created by dario on 23/01/2018.
 */

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var customerSchema = new Schema({
    title:String,
    name: String,
    surname: String,
    piva:String,
    cf:String,
    skype:String,
    birthDay: Date,
    note:String,
    address:[{
        type:String,
        state:String,
        address:String,
        city :String,
        postcode:String,
        province:String
    }],
    phone:[{
        type:String,
        phone:String,
    }],
    email:[{
        type:String,
        mail:String,
    }],
    meta: [{
        type: String,
        value: String
    }],
    $setOnInsert: {
        created_at: new Date()
    },
    updated_at: new Date()
});


// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Customer', customerSchema);
