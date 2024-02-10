const usermodel = require('./usermodel')
const bcrypt = require('bcrypt')
const saltRoutes = 10

module.exports = {
    register,
    getRegisteredData,
    updateOne,
    deleteOne}

function register(req,res){
    let validation = []

    if(!req.body.name){
        validation.push('name')
    }
    if(!req.body.email){
        validation.push('email')
    }
    if(!req.body.phone){
        validation.push('phone')
    }
    if(!req.body.password){
        validation.push('password')
    }
    if(validation.length>0){
        res.send({
            success:false,
            status:400,
            message:validation.join(',')+' is/are required'
        })
    }
    else{
        usermodel.findOne({email:req.body.email}).then(obj=>{
            if(!!obj){
                res.send({
                    success:false,
                    status:409,
                    message:"user already exists with this email"
                })
            }
            else{
                usermodel.countDocuments().then(doc=>{
                    let obj = new usermodel()
                    obj.name = req.body.name
                    obj.email = req.body.email
                    obj.phone = req.body.phone
                    
                    const hashpwd = bcrypt.hashSync(req.body.password, saltRoutes)
                    obj.password =hashpwd

                    obj.save().then(doc=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"added successfully",
                            data:doc
                        })
                    }).catch(err=>{
                        res.send({
                            success:false,
                            status:400,
                            message:"ERROR =>"+err
                        })
                    })
                
                }).catch(err=>{
                    res.send({
                        success:false,
                        status:400,
                        message:"ERROR =>"+err
                    })
                })
            }
        }).catch(err=>{
            res.send({
                success:false,
                status:400,
                message:'ERROR =>'+err
            })
        })
    }
}

function getRegisteredData(req,res){
    let validation = []
    if(!req.body.id){
        validation.push('id')
    }
    if(validation.length>0){
        res.send({
            success:false,
            status:400,
            message:validation.join(',')+' is required'
        })
    }
    else{
        usermodel.findOne({_id:req.body.id}).then(obj=>{ 
            res.send({
                success:true,
                status:200,
                message:"find data",
                data:obj
            })
        }).catch(err=>{
            res.send({
                success:false,
                status:500,
                message:"ERROR =>"+err
            })
        })
    }
}

function updateOne(req,res){
    usermodel.updateOne({_id:req.body.id},{name:req.body.name}).then(doc=>{
        res.send({
            success:true,
            status:200,
            message:"updated successfully",
            updated:doc
        })
    }).catch(err=>{
        res.send({
            success:false,
            status:500,
            message:"ERROR =>"+err
        })
    })
}

function deleteOne(req,res){
    usermodel.deleteOne({_id:req.body.id}).then(doc=>{
        res.send({
            success:true,
            status:200,
            message:"deleted suceessfully",
            delete:doc
        })
    }).catch(err=>{
        res.body({
            success:false,
            status:500,
            message:"ERROR =>"+err
        })
    })
}

