const express = require('express');
const router = express.Router();
const ApplicationData = require('../models/application');
const multer = require('multer');
 
const DIR  = './uploads';                 // file upload code 
const storage  = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, DIR)
    },
    filename: (req, file, cb)=>{
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, filename)
    },
});
var upload = multer({ 
    storage:storage,
});

router.post('/upload', upload.single('resume'), async(req, res, next)=>{
   try {
    const url = req.protocol + '://' + req.get('host')
    const user = new ApplicationData({
        resume : url + '/download/' + req.file.filename,
        link: req.body.link,
        job_id: req.body.job_id,
        alum_id: req.body.alum_id
    });
    const saved = await user.save()
    res.send(saved)
   } catch (error) {
    console.log(error)
   }
});

router.get('/applicationdata/:id', async (req, res)=>{       // getdata for admin to collect unverified applications
    try {
        const id = req.params.id
        const list = await ApplicationData.find({job_id: id , approval_status: "not approved"})
        res.send(list)
    } catch (error) {
        console.log(error)
    }
});

router.get('/UVApps', async (req, res)=>{                    // unverified applications
    try {
        const list = await ApplicationData.find({ approval_status: "not approved"})
        res.send(list)
    } catch (error) {
        console.log(error)
    }
});

router.get('/VApps', async (req, res)=>{      // verified applications
    try {
        const list = await ApplicationData.find({ approval_status: "verified"})
        res.send(list)
    } catch (error) {
        console.log(error)
    }
});

router.get('/Apps', async (req, res)=>{      // verified applications
    try {
        const list = await ApplicationData.find({ approval_status: "verified",postedBy:"employer"})
        res.send(list)
    } catch (error) {
        console.log(error)
    }
});

router.get('/applicationdatas/:id', async (req, res)=>{       // getdata for verified applications
    try {
        const id = req.params.id
        const list = await ApplicationData.find({job_id: id,approval_status:"verified" })
        res.send(list)
    } catch (error) {
        console.log(error)
    }
});

router.delete('/delete/:id', async (req, res)=>{
    try {
        id = req.params.id
        const data = await ApplicationData.findByIdAndDelete(id)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
});

router.put('/verify', async(req, res)=>{
    try {
        console.log(req.body.id)
        const id = req.body.id
        const update = {
            approval_status: "verified"
        }
        const updates = {$set: update}
        const verified = await ApplicationData.findByIdAndUpdate({"_id": id}, updates, {new:true} )
        res.send(verified)
    } catch (error) { 
        console.log(error)
    }
});

module.exports = router;