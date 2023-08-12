const mongoose = require('mongoose');
const employerSchema = new mongoose.Schema({
    name:{
        type: String, 
    },
    email:{
        type: String, 
    },
    phone:{
        type: String, 
    },
    company:{
        type: String, 
    },
    password:{
        type: String, 
    },
    designation:{
        type: String, 
    }, 
    usertype:{
        type:String,
        default:"employer"
    },
    approval_status:{
        type: String,
        default: "not approved"
    }
});

const employerData = mongoose.model('Employer_Details',employerSchema)
module.exports = employerData;