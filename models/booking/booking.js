/**
 * Created by dario on 23/01/2018.
 */

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookingSchema = new Schema({
    title:String,
    name: String,
    surname: String,
    description: String,
    umbrella: String,
    beach: String,
    piva:String,
    cf:String,
    skype:String,
    startDate: Date,
    endDate: Date,
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
    // $setOnInsert: {
    //     created_at: new Date()
    // },
    user: Schema.Types.ObjectId,
    updated_at: Date
});


// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Booking', bookingSchema);
