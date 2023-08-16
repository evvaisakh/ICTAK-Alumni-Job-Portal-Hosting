const express = require('express');
const app = new express();
const logger = require('morgan');
const cors = require('cors');
const api = require('./routes/api');
const path = require('path');
const PORT = 3000;
const db = require("./middlewares/db");


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',api);

app.get('/download/:resume',(req,res)=>{
    console.log(res);
    res.sendFile(path.join(__dirname,`./uploads/${req.params.resume}`));
});

app.use(express.static('./dist/frontend'));


// last route
app.get('*', async(req, res)=>{
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});