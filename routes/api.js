//MASTER API

const express = require('express');
const router = express.Router();

// below declare all required api

const verifiedJobs = require('./jobApi');
const alumni = require('./alumniApi');
const employer =require('./employerApi');
const application = require('./applicationApi');
const login = require('./login');

//use api

router.use('/login',login);
router.use('/verifiedjobs',verifiedJobs);
router.use('/alumni',alumni);
router.use('/employer',employer);
router.use('/application',application);

module.exports = router;