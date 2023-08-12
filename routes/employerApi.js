const express = require('express');
const router = express.Router();
const EmployerData = require('../models/employerProfile');
const jwt = require('jsonwebtoken');

router.get('/employerlist',async(req,res)=>{
    try {
        const list = await EmployerData.find()
        res.send(list)
    } catch (error) {
       console.log(error) 
    }
});

router.get('/employers',async(req,res)=>{       // getdata for admin to collect unverified employer
    try {
        const list = await EmployerData.find({approval_status: "not approved"})
        res.send(list)
    } catch (error) {
       console.log(error) 
    }
});

router.get('/employersV',async(req,res)=>{       // getdata for admin to collect unverified employer
    try {
        const list = await EmployerData.find({approval_status: "verified",posted_By:req.body.id})
        res.send(list)
    } catch (error) {
       console.log(error) 
    }
});

router.get('/employersignup/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const singleEmployer = await  EmployerData.findById(id)
        res.send(singleEmployer)
    } catch (error) {
        console.log(error)
    }
});

router.delete('/deleteemployer/:id', async(req,res)=>{    // admin deleting employer
    try {
        const id = req.params.id
        const data = await EmployerData.findByIdAndDelete(id)
        res.send(data)
    } catch (error) {
        console.log(error)
    }   
});

router.put('/verifyemp', async(req,res)=>{    // for admin to get employer to verify
    try {
        console.log(req.body)
        const id = req.body._id
        const update = { 
            name: req.body.name,
            email: req.body.email,
            phone:  req.body.phone,
            company: req.body.company,
            approval_status:  req.body.approval_status,
            password:  req.body.password,
            designation: req.body.designation
        }
        const updates = {$set: update}
        const verifiedEmp = await EmployerData.findByIdAndUpdate({"_id": id}, updates,{new:true})
        res.send(verifiedEmp)
    } catch (error) {
        console.log('update error:',error);
    } 
});

router.get('/singleemp',async(req,res)=>{       //get singledata of alumni
    try{
        const data = await EmployerData.findOne({email:req.body.email,password:req.body.password})
        res.send(data)
    }catch(error){
        console.log(error)
    }
});

router.post('/employersignup', async (req, res) => {
    try {
        const item = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            company:req.body.company,
            designation:req.body.designation,
            password:req.body.password
        }
        const user = await EmployerData.findOne({ email: req.body.email })
        if (!user) {
            const newuser = new EmployerData(item)
            const saveuser = await newuser.save()
            res.send(saveuser)
        }
        return res.json({ message:"Email already registered" });
    } catch (error){
        console.log('post error:',error)
    }
});

//EMPLOYER LOGIN CHECK
router.post('/emplogin', async (req, res) => {
    try {
        const user = await EmployerData.findOne({ 
            email: req.body.email, 
            password: req.body.password})
        if (!user) {
            return res.json({ message: "Invalid username or password" });
        }
        res.send(user)
    } catch (error) {
        console.log(error)
    }
});

router.post('/employer', async (req, res)=>{
    try {
        const user = await EmployerData.findOne({ 
            email: req.body.email, 
            password: req.body.password,approval_status:"verified"})
            const email = req.body.email;
            const password = req.body.password;
            
            let payload = {
                'email':req.body.email,
                'password':req.body.password,
                'date':Date.now()}

                let token =await jwt.sign(payload,'secretkey')
        if (!user) {
            return res.json({ message: "Invalid username or password or admin didnot verified yet" })
        }
        res.send({token,user})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;