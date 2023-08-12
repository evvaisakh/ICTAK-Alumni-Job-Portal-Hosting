const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
    resume:{
        type: String,
    },
    link:{
        type: String,
    },
    job_id:{
        type: String,
    },
    alum_id:{
        type: String,
    },
    approval_status: {
        type: String,
        default: "not approved"
    }
});
const applicationData = mongoose.model('Applications',applicationSchema);
module.exports = applicationData;