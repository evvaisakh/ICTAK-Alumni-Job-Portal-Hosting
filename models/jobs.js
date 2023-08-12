const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
    },
    qualification:{
        type: String,
    },
    experience:{
        type: String,
    },
    jobSector:{
        type: String,
    },
    companyName:{
        type: String,
    },
    location:{
        type: String,
    },
    closingDate:{
        type: Date,
    },
    skills:{
        type: Array,
    },
    description:{
        type: String,
    },
    salaryRange:{
        type: String,
    },
    postedBy:{
        type: String,
    }
});

const jobData = mongoose.model('Job_Data',jobSchema);
module.exports = jobData;