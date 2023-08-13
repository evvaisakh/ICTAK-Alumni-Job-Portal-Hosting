const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://VaisakhVijayan:Nowuseeme@cluster0.9dpttcy.mongodb.net/Database2?retryWrites=true&w=majority")
.then(()=>{
    console.log (`Connected to MongoDB Database`);
})
.catch((error)=>{
    console.log(`Error in connecting to database ${error.message}`);
})
