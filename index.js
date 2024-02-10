const express = require('express')
const usermodel = require('./apis/user/usermodel')
const usercontroller = require('./apis/user/usercontroller')
const categorycontroller = require('./apis/category/categorycontroller')
const categoryroutes = require('./routes/categoryroutes')
const userroutes = require('./routes/userroutes')
require('./config/db')
const app = express()

app.use(express.json())
app.use('/register',userroutes)
app.use('/login',categoryroutes)

app.listen(5000, (err)=>{
    if(err){
        console.log('ERROR =>'+err);
    }
    else{
        console.log('server is started');
    }
})