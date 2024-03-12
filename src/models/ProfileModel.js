const mongoose = require('mongoose');

const DataSchema = mongoose.Schema ({
    
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    EmailAddress:{type:String,required:true,uniqued:true},
    MobileNumber:{type:String},
    City:{type:String},
    UserName:{type:String, uniqued:true,required:true},
    Password:{type:String,required:true}


},{versionKey:false});

const profileModel = mongoose.model('profiles',DataSchema);

module.exports = profileModel;